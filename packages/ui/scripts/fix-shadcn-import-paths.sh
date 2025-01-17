#!/usr/bin/env bash
# source: https://github.com/firxworx/vite-shadcn-workspace/blob/main/packages/react-ui/fix-shadcn-import-paths.sh
set -euo pipefail

# this script patches files generated by shadcn CLI to fix import statements for compatibility
# with node subpath imports
#
# @see package.json for `postshadcn` that triggers this script after execution of `shadcn` script

# summary of the problem:
#
# current shadcn CLI generates import paths as follows:
#
# `import { cn } from '#/lib/utils'`
#
# this script corrects the import by removing the '/' that follows the '#':
#
# `import { cn } from '#lib/utils'`
#
# the fix enables type checking via `tsc --noEmit` that the shadcn CLI would otherwise break for the workspace.
#
# this situation could be avoided if shadcn CLI were to adopt a simple and declarative config format instead
# of implementing its own internal logic that accepts inputs from multiple sources.

PACKAGE_SRC_DIR="packages/ui/src"
SHADCN_DIR=".shadcn-ui"

WORKSPACE_ROOT="$(git rev-parse --show-toplevel)"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Use find to return a list of files in the .shadcn-ui directory
shadcn_files=$(find "$SHADCN_DIR" -type f)

echo "Running script to fix shadcn cli's habit of borking node subpath imports..."

# loop over the modified files and process with `sed` to fix the import paths for valid node subpath imports
for file in $shadcn_files; do
  echo "> processing file: $file"

  # Create the destination path by replacing .shadcn-tmp with packages/ui/src
  relative_path="${file#$SHADCN_DIR/}"  # Remove the .shadcn-ui prefix
  destination_path="$WORKSPACE_ROOT/$PACKAGE_SRC_DIR/$relative_path"

  # Ensure the destination directory exists
  mkdir -p "$(dirname "$destination_path")"

  echo $file
  echo $destination_path
  # compare the backup and potentially modified files and report if a change was made
  if ! cmp --silent "$file" "$destination_path"; then
    echo "> modified file: $destination_path"
    sed -E "s|^import (.*) from (['\"])#/(.*)|import \1 from \2#\3|" "$file" > "$destination_path"
  fi

done

echo "Script complete."

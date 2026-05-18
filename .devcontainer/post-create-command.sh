#!/bin/bash

set -euo pipefail

if [[ -f pnpm-lock.yaml ]]; then
  pnpm install --ignore-scripts
  pnpm run prepare
fi

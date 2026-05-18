#!/bin/bash

set -euo pipefail

[[ -f pnpm-lock.yaml ]] && { pnpm install --ignore-scripts; pnpm run prepare; }
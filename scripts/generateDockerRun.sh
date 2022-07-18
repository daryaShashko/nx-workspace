#!/bin/bash

(jq -n \
    --arg imagename "$1" \
    --arg update 'true' \
    --arg port "3333" \
    '{
      AWSEBDockerrunVersion: "1",
      Image: {
        Name: $imagename,
        Update: $update,
      },
      Ports: [
        {
          ContainerPort: $port
        }
      ]
    }') > "$PWD/Dockerrun.aws.json"

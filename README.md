# PocketScroll Foundry Companion

Foundry VTT companion module for the [PocketScroll](https://pocketscroll.app) mobile app. This module enables real-time communication between Foundry VTT and the PocketScroll app, allowing players and GMs to interact with their game sessions from mobile devices.

## Requirements

- Foundry VTT (verified on v13)
- A GM user must be logged into Foundry for the module to function

## Installation

### Manual Install

1. Download and extract this folder into your Foundry VTT modules directory:
   - **Windows**: `%AppData%/FoundryVTT/Data/modules/`
   - **macOS**: `~/Library/Application Support/FoundryVTT/Data/modules/`
   - **Linux**: `~/.local/share/FoundryVTT/Data/modules/`
2. The resulting path should be: `.../modules/pocketscroll-socket/module.json`
3. Restart Foundry VTT

### Manifest URL

In Foundry, go to **Add-on Modules > Install Module** and paste the manifest URL:

```
https://flavio-s-amorim.github.io/pocketscroll_foundry_module/module.json
```

## Setup

1. In Foundry VTT, go to **Game Settings > Manage Modules**
2. Enable **PocketScroll Foundry Companion**
3. Open the PocketScroll app on your mobile device and enter your Foundry server URL

## Features

- Real-time character sheet access (HP, abilities, spells, inventory)
- Dice rolling (attacks, checks, saves, damage)
- Combat tracker with initiative management
- Interactive map with fog of war
- Token movement and visibility
- Short and long rests
- Condition/status effect toggling

## How It Works

The module runs on the GM's client and acts as a bridge between the PocketScroll app and Foundry VTT. It listens for requests over Foundry's socket system and executes actions on behalf of connected players. The module auto-updates its core logic at runtime, so GMs do not need to reinstall to receive updates.

## Troubleshooting

- **App can't connect**: Make sure the GM is logged into Foundry and the module is enabled in the active world.
- **Features not working**: Check the browser console (F12) for messages prefixed with `PocketScroll Socket |`.
- **Module not appearing**: Verify the folder structure is `modules/pocketscroll-socket/module.json` (not nested an extra level).

## Support

For help or to report issues, visit [pocketscroll.app](https://pocketscroll.app).

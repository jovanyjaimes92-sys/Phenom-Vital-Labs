# Phenom Vital Labs - Peptide Calculator

## Project Structure

```
phenom-vital-labs/
├── index.html              # Main app entry
├── README.md                # Project documentation
├── .env.example             # Environment template
├── .gitignore               # Git ignore rules
│
├── css/                     # Stylesheets
│   └── styles.css            # Main application styles
│
├── js/                      # JavaScript modules
│   ├── main.js              # App entry point
│   ├── calculator.js        # Core calculation logic
│   ├── dataLoader.js         # JSON data loading
│   ├── debug.js             # Debug utilities
│   ├── pdfGenerator.js       # PDF generation
│   └── ui.js                # UI rendering & interactions
│
├── data/                    # Data files
│   └── peptides.json         # 44 peptides dataset
│
└── scripts/                 # Utility scripts
    ├── check-supplier.js   # Supplier data checker
    ├── show-dosing.js       # Dosing display utility
    ├── update-dosing.js     # Data updater
    ├── update-missing.js   # Missing data handler
    ├── update-all-dosing.js # Batch dosing updater
    ├── dosing-table.txt     # Reference dosing table
    ├── dosing-report.txt    # Dosing report
    ├── missing-peptides.json # Missing peptides data
    └── git_commands.ps1    # Git automation commands
```

## Files Included

### Production Files (Deployed)
- `index.html` - Main application
- `css/styles.css` - Application styles
- `js/*.js` - Core application modules
- `data/peptides.json` - 44 peptide database

### Configuration
- `.env.example` - Environment variables template
- `.gitignore` - Git ignore rules

### Development Scripts (scripts/)
- Various utilities for data management and debugging

## Features
- ✅ 44 peptides with clinical dosing
- ✅ 3 dosing levels (Conservative/Standard/Advanced)
- ✅ PDF generation with visual syringe guides
- ✅ Benefits & considerations display
- ✅ PDF preview & download
- ✅ Mobile responsive design

## Live URL
https://jovisbot.github.io/Phenom-Vital-Labs/

## Version
v27 (Latest)

## Status
✅ Complete & Deployed

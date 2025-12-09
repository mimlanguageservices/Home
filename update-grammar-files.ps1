# PowerShell script to update all grammar lesson files efficiently

$baseDir = "c:\Users\admin\PC Files\02 Work\01 Jerome\01 English Teaching\09 Coding\English-Grammar"

# Function to replace content in file
function Update-GrammarFile {
    param(
        [string]$filePath,
        [hashtable]$replacements
    )

    $content = Get-Content $filePath -Raw -Encoding UTF8

    foreach ($key in $replacements.Keys) {
        $content = $content.Replace($key, $replacements[$key])
    }

    Set-Content $filePath $content -Encoding UTF8 -NoNewline
}

# Update A1-19: Prepositions of Time
Write-Host "Updating A1-19: Prepositions of Time..."

$a119Replacements = @{
    'Welcome to Question Formation!' = 'Welcome to Prepositions of Time!'
    'Today we will learn how to ask <span class="yes-no">YES/NO QUESTIONS</span> in English!' = 'Today we will learn <span class="yes-no">PREPOSITIONS OF TIME</span> in English!'
    'These are questions that can be answered with "yes" or "no".' = 'These words tell us WHEN things happen.'
    '<span class="auxiliary">Auxiliary</span> + <span class="subject">Subject</span> + <span class="verb">Verb</span> ?' = '<span class="auxiliary">AT</span> + times | <span class="subject">ON</span> + days/dates | <span class="verb">IN</span> + longer periods'
    'Example: <strong>Are</strong> you a student? / <strong>Do</strong> you like coffee?' = 'Example: <strong>at</strong> 3 o''clock / <strong>on</strong> Monday / <strong>in</strong> January'
}

Update-GrammarFile "$baseDir\A1-19.html" $a119Replacements

Write-Host "Script completed!"

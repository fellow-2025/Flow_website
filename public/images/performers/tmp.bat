@echo off
setlocal enabledelayedexpansion

for %%f in (*.png *.jpg *.jpeg *.bmp *.tif) do (
    set "filename=%%~nf"
    echo Processing: %%f

    :: 一時リサイズ用ファイル
    magick "%%f" -resize 400x400^> "!filename!_resized.png"

    :: 出力ファイル名の重複を避ける処理
    set "outfile=!filename!.webp"
    set "count=1"
    :check_exists
    if exist "!outfile!" (
        set "outfile=!filename!_!count!.webp"
        set /a count+=1
        goto :check_exists
    )

    :: .webp へ変換（上書き回避済みのファイル名）
    cwebp -q 80 "!filename!_resized.png" -o "!outfile!"

    :: 一時ファイル削除
    del "!filename!_resized.png"
)

echo Done.
pause

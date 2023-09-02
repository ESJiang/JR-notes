- [VScode shortcuts summary](#vscode-shortcuts-summary)
  - [General](#general)
    - [Show command palette](#show-command-palette)
    - [Quick open, go to file](#quick-open-go-to-file)
    - [New window/instance](#new-windowinstance)
    - [New file under a folder](#new-file-under-a-folder)
    - [Close window/instance](#close-windowinstance)
    - [User settings](#user-settings)
    - [Display keyboard shortcuts](#display-keyboard-shortcuts)
  - [Basic Editing](#basic-editing)
    - [Cut line](#cut-line)
    - [Copy line](#copy-line)
    - [Move line up/down](#move-line-updown)
    - [Copy line up/down](#copy-line-updown)
    - [Delete line](#delete-line)
    - [Insert line up/down](#insert-line-updown)
  - [Navigation](#navigation)
    - [Show all symbols](#show-all-symbols)
    - [Go to line by line number](#go-to-line-by-line-number)
    - [Go to symbol](#go-to-symbol)
    - [Go to previous/next error or warning](#go-to-previousnext-error-or-warning)
  - [Selection](#selection)
    - [Select all occurrences of current word](#select-all-occurrences-of-current-word)
    - [Multiple cursor selection](#multiple-cursor-selection)
  - [File management](#file-management)
    - [Open previous/next file in source code window](#open-previousnext-file-in-source-code-window)
    - [Open file](#open-file)
  - [Display](#display)
    - [Toggle full screen](#toggle-full-screen)
    - [Toggle sidebar](#toggle-sidebar)
    - [Toggle focus](#toggle-focus)
    - [Toggle search](#toggle-search)

# VScode shortcuts summary

## General
### Show command palette
`command+shift+p`
> 这里用比较简单的方法是使用键盘的F1键

### Quick open, go to file
`command+p`

### New window/instance
`command+shift+n`

### New file under a folder
`command+n`

### Close window/instance
`command+w`

### User settings
`command+,`

### Display keyboard shortcuts
`command+k command+s`

## Basic Editing
### Cut line
`command+x`
> 比delete键的优势是删除当前行不需要用鼠标选中<br>
> 注意删除顺序, 当前行 - 当前行向下 - 当前行向上

### Copy line
`command+c`

### Move line up/down
`alt+up/down`

### Copy line up/down
`alt+shift+up/down`
> 非常好用, 复制当前行到上一行/下一行, 实现在sublime里的`command+shift+d`

### Delete line
`command+shift+k`
> 和`command+x`相同的是, `command+shift+k`遵循相同的删除顺序
> 和`command+x`不同的是, `command+shift+k`不会保存删除内容到剪切板. 这对于仅想删除当前行同时不影响之前复制的内容很有效

### Insert line up/down
`command+enter` -> next empty line
`command+shift+enter` -> previous empty line

## Navigation
### Show all symbols
`command+T`

### Go to line by line number
`control+G`

### Go to symbol
`command+shift+m`

### Go to previous/next error or warning
`F8+shift` `F8`

## Selection
### Select all occurrences of current word
`command+F2`
> 非常好用, 假如一个变量名你想修改且它在同一个文件中被反复调用, 推荐使用上面指令；当你只想查看变量名出现不同位置, 推荐使用`command+f`

### Multiple cursor selection
`option+command+down`

## File management
### Open previous/next file in source code window
`control+shift+tab` `control+tab`

### Open file
`command+o`
> `command+o`用输入路径来定位文件; `command+p`用文件名定位文件
>> 一般多用`command+p`来打开文件, 因为你只要知道文件名就可以了

## Display
### Toggle full screen
`option+command+f`

### Toggle sidebar
`command+b`

### Toggle focus
`command+shift+e`
> 这个指令是改变当前cursor的聚焦, 焦点在Explorer sidebar和source code window之间变化

### Toggle search
`command+shift+f` -> 全文件搜索
`command+f` -> 当前文件搜索

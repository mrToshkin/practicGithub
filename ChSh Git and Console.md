# CHEATSHEET GIT И GITHUB

## ЛОКАЛЬНЫЙ ГИТ (@=HEAD)

```bash
git init   # инициализировать папку. Появится скрытая папка .git
git status # показывается в каком состоянии репозиторий.

git add . # добавить всю текущую папку готовой к коммиту (индексация).
git add <file> # проиндексировать конкретный файл.
git add -p <file> # позволяет индексировать выборочную часть файла.
git add -i # запустить интерактивную оболочку для добавления в индекс только выбранных файлов

git commit -m "info" # коммит с описанием.
git commit --amend -m "info" # изменить последний коммит с изменением описания.
git commit -a -m "info" (или -am) # добавить всё в индекс и сразу закоммитить. Добавляются только отслеживаемые файлы.
git commit -c <hash/ORIG_HEAD> # скопировать и отредактировать описание и закоммитить (-С без редактирования). Копирует и имя и дату автора (--reset-author без копирования автора).
git commit -v          # откроет редактор описания с показанным диффом.

git stash              # временно сохранить незакоммиченные изменения и убрать их из рабочей директории.
git stash pop          # вернуть сохраненные командой git stash изменения в рабочую директорию.
git cat-file -p <hash> # показать содержимое коммита по его хэш.
git tag <tagname>                     # создает тэг для коммита (-d удалить тег).
git tag -a -m "info" <tagname> <hash> # тэг с аннотацией, без -m откроется редактор текста.

git reset # метод для локальных коммитов
	--soft HEAD^ # удалить последний созданый локальный коммит с сохранением изменений.
	--hard HEAD^ # удалить последний созданый локальный коммит с удалением изменений.
	--hard ORIG_HEAD # для отмены перебазирования
	--hard <tag or hash> # удаляет локальные коммиты до указанного коммита невключительно. При git log --all их всё равно будет видно, но они будут отсутствовать в ветке мастер.
	<file> # отменить индекс конкретного файла (режим --mixed, он по-умолчанию)
	--hard # отмена merge с удалением изменений индексированных и неиндексированных файлов
	--keep
	--merge = git merge --abort # отмена merge с сохранением изменений только в неиндексированных файлах

git revert # метод для remote коммитов
	<hash> # вернуть выбранный коммит и дать описание, ставит его первым в ветку.
	HEAD # создаст коммит с противоположными изменениями
	<merged commit> -m 1 # при слияниях работает только так, с обращением на номер родителя (1 - номер родителя). [Подробнее о ситуации](https://youtu.be/ktsxDQxcaJ0)

git rm <file> # удалить файл из коммита и на компьютере, и затем нужно перекоммитить
git rm --cached <file> # удалить файл из коммита и не удалять на компьютере, он будет не проиндексирован, затем нужно перекоммитить  #
git commit --amend --no-edit
git mv <file> <folder> # переместить файл в папку и тут же проиндексировать

gitk # запуск программы где наглядно видна история изменений и диффы (gitx для OSX)
git diff # показывает разницу в измененных файлах (q - выйти)
	--cashed # показывает разницу в индексированных файлах (которые после add но до commit)
	--color-words # дифф по словам, удобно для html с подключенным драйвером
git show <hash of commit> # показать какие изменения были в конкретном коммите (указать хэш (куча букв и цифр))
git reflog <branch> # история изменений ссылок, по-умолчанию HEAD
git reflog expire --expire=now --all # полностью очищает все рефлог.
git gc # сборщик мусора, отчищает недостижимые коммиты старше 2 недель. --prune=now чтобы без 2 недель
# [Скринкаст](https://youtu.be/32dlNvz5OEo)
git clean -dxf # удаление всех неотслеживаемых файлов (d - удаление и директорий, x - удаление игнорируемых в .гитигнор, f - force уверенный вызов)

git log # история коммитов 
	-1 # показывает последний коммит, -2 два последних и тд.
	--oneline # показать сокращенную версию в одну линию
	--all # вся история коммитов независимо от положения HEAD
	--all --graph # показывает наглядно ветки
	-p # лог с диффами по каждому коммиту
	<branch> --first-parent # история коммитов ветки
	--oneline --cherry <branch1>...<branch2> # показывает эквивалентные (=) и неэквивалентные (были конфликты при cherry-pick)(+) коммиты между двумя ветками.

git chechout
	<branch/hash/tag> # переключится в конкретную ветку/хэш/тэг, например master
	<hash> <file> # откатить изменения в файле до последнего коммита (если указан хэш то до указанного коммита) или вернуть его если удален файл. Если указан хэш, но не указан файл, то мы перемещаемся в этот коммит, он становится HEAD.
	-b <branch> <hash> # перейти к конкретному коммиту и дать имя ветке. Последний коммит называется master, это мастер ветка. 
	-B # передвинет существующую ветку и переключится на нее
	--ours/--theirs <file> # оставить изменения только одной стороны конфликта

git branch
	-m <new name local branch> # находясь в какой-то ветке переименует ее.
	-f <branch> <hash/HEAD~n> # (force) переместит указатель branch на n коммитов относительно HEAD (необходимо чтобы HEAD был в другой ветке или на коммите). Например так можно оттеснить мастер вниз дерева коммитов оставив эти коммиты на другую ветку.

git merge
	<branch> -m "info" # влить указанную ветку в текущую ветку создав общий коммит
	<branch> --log # влить с описанием из двух сливаемых веток
	<branch> --no-commit # для решений семантических конфликтов (конфликты по смыслу которые гит не увидит), после решения необходимо добавить в индекс и делать коммит слияния.
	--no-ff <branch> # без этого флага запрета перемотки, в обычной ситуации если ветки не расходятся, а имеют все общие коммиты, то он просто передвинет ветку вперед к сливаемой. С флагом он сделает общий коммит, будут видны расхождения веток. Это удобно для наглядности и коммандой работы, сохранения исконной мастер ветки. Такой поведением с флагом можно задать по-умолчанию.
	--squash <branch> # сливает изменения из указанной ветки, но не создает связь с ней как с родителем. MERGE_HEAD не создается, команды аборт и континум работать не будут, но будет работать аналог git reset --merge.

git cherry-pick 
	<hash> <hash> <hash> ... # находясь в какой-либо ветке (например мастер) склонирует последовательно указанные коммиты из других веток с теми же изменениями в эту ветку (мастер).
	-n # (--no-commit) берет изменения из указанного коммита и добавляет их в индекс без создания коммита

git rebase # (при командной работой над веткой не используют)
	# (есть некоторые проблемы перебазирования merge коммитов. [Видео](https://youtu.be/S_NYo4Y8zXI)
	<other branch> # находясь в ветке вливает в дерево коммитов другую ветку (например мастер). Все коммиты теперь идут последовательно (ваша другая ветка начинается со свежего мастер коммита).
	-i HEAD~n # interative, открывает в редакторе ребейс коммитов на n от HEAD в своей ветке.
	--edit-todo # отредактировать интерактивное перебазирование когда оно остановлено
	-x '...' <other branch> # запускает произвольную команду (например установленный автоматизированный тест чтобы не получить неисправный код в результате перебазирования веток)
```
## КАК ИЗМЕНИТЬ СТАРЫЙ КОММИТ

1. Сделать git rebase -i с переставлением нужного коммита в вершину ветки. Изменить его командой git commit --amend. Вернуть последовательность обратно через git rebase -i. Перестановки провоцируют множество конфликтов.

2. Сделать последовательный cherry-pick

## SSH КЛЮЧ
```bash
ssh-keygen -t rsa -b 4096 -C "your_mail@example.com" # генерирует SSH ключ. Делается только один раз, указывается мыло при регистрации. Ключ нужен для авторизации с сервером гит.
cd ~/.ssh # ls # проверить наличие ключа на компьютере
# Залить ключ на гитхаб
ssh -T -i ~/.ssh/idname git@github.com # проверить связи с гитхабом ключ парой
# Можно создать конфиг в котором указать ключ для работы с хостом github.com
```
## РАБОТА С ГИТХАБ метки=ветки
```bash
git clone <oldrep> <name newrep> # склонировать локальный репозиторий. Оригинал так же будет считаться remote origin
git clone <SHH or HTTPS> # склонировать удаленный репозиторий на компьютер
git remote add origin <link by github> # привязать репозиторий на гитхаб (origin это принятое имя remote репозитория, его можно задать другим, просто так принято)
git remote -v # проверить добавлен ли репозиторий

git push origin master - пуш в мастер ветку origin репозитория
git push origin <local branch>:<remote branch> # пуш локальной ветки в удаленную ветку origin репозитория. Имена могут быть разными
git push origin :<remote branch> # удаляет удаленную ветку. (как бы пуш ничего в удаленную ветку)
git push -f # forse пуш, затирает удаленные коммиты которых нет в локальном репозитории. Например после rebase.

git pull origin master - находясь в master ветке, пулл ветки master origin репозитория. Помечены как origin/master - удаленная метка. Будут две метки: master и origin/master. Другие ветки он не вытянет, поэтому переключиться на них пока не получится.

git checkout -b <local branch> <origin/remote branch> # создать и назвать ветку в месте где удаленная ветка. 
	Например: git checkout -b addcontent origin/addcontent # создаст локальную ветку addcontent в месте где  удаленная ветка origin/addcontent

git fetch # забирает коммиты из удаленного репозитория.
git fetch origin # забирает другие ветки удаленного origin репозитория. Помечены как origin/<branch> - удаленная метка, локальной метки нет, он не сливает с локальным репозиторием.
git merge origin/<branch> # сливает извлеченные удаленные коммиты в локальную ветку. Например после fetch

git pull # эквивалентна связке команд git fetch и после git merge
git pull --rebase # подтянет новые удаленные коммиты, перебазирует с локальными новыми коммитами, поставт их в один ряд.
```
## СВЯЗЬ ЛОКАЛЬНОЙ И УДАЛЕННОЙ ВЕТКИ
```bash
git branch --set-upstream-to=<origin/remote branch> # связывает локальную и удаленную метки. Теперь можно просто писать git push и git pull не указывая ветки. (htmlacademy)
git branch -u origin/<branch> <local branch> # связывает ветки
git branch --track <branch> origin/<branch> # создать локальную ветку и отслеживать по удаленной (githowto)
git push -u origin <remote branch> # пушит в указанную ветку, например мастер, и сразу связывает локальную ветку с удаленной.
git branch -vv # посмотреть очень подробно (-vv) какие локальные метки связанны с удаленными.
```
## РАБОТА С РЕДАКТОРОМ vim
```bash
vim <file> # открыть в редакторе

i # перейти в режим редактирования
dd # удалить строчку
u # отменить изменения
ZQ (зажат Shift, поочередное нажатие) # выход без сохранения
ZZ (зажат Shift, поочередное нажатие) # сохранить и выйти

нажать ESC после редактирования
:w - сохранить, :wq - сохранить и выйти, :q! - выйти без сохранения
нажать Enter
:w filename.txt # сохранить файл как filename.txt
```
## РАБОТА С ПЕРЕХОДАМИ
>Программа постраничного отображения (листалка) называется LESS
```bash
echo $SHELL # проверяет текущий шелл
pwd # показать полный путь текущей папки
cd # переход по папкам
ls -1 # список содержимого в папке в столбик. -а # показать в том числе скрытые
start . # открыть папку в проводнике (точка одначает текущую)
cat <file> # показать содержимое файла
mkdir <namefolder> # создать папку
rmdir <namefolder> # удалить папку
```
## НАСТРОЙКА ГИТ
```bash
Есть три пути конфига: 
	--system # C:\Program Files\Git\etc\gitconfig
	--global # C:\Users\<USERNAME>\.gitconfig
	--local (default) # <project>/.git/config

git config --<system/global/local/default_all> --list # посмотреть настройки гита.
cat .git/config # (local) посмотреть локальные настройки гита
git config user.name mrToshkin
git config user.email toshkin.na@gmail.com # создаст локальные настройки. Лучше оставить глобальные.
git config --global core.attributesFile ~/.gitattributes # задаст адрес глобального атрибут файла
git config rerere.enabled true # влючает rerere опцию при которой гит запоминает решения конфликтов и, например при отмене и снова merge или rebase, после повторной ситуации сам так же ее и решит.
git rerere forget <file> # забыть записанное решение конфликта по этому файлу. Для этого во время merge надо сначала переключиться на версию файла с конфликтом git checkout --merge <file> и уже потом забыть решение. Есть способы использовать ранее решение конфликта при выключенном rerere - [видео](https://youtu.be/cuk3LQAG2PE)

.gitattributes обычно находится в корне проекта, но может находиться:
	<project>/.git/info/attributs
	<project>/../.gitattributs или в корне проекта. Вложенностью ограничивается влияние.
	~/.gitattributes # если задано для глобального. ~/ # директория user
	C:\Program Files\Git\etc\gitattributes
.gitignore обычно находится в корне проекта.
	<project>/../.gitignore
	<project>/.git/info/exclude
	git config --global core.exludesFile ~/.gitignore
```
>[Видео - инклюд подключение конфига компании](https://youtu.be/JTtnro8ii_U)

## НЮАНСЫ РАЗЛИЧИЯ WINDOWS И UNIX СИСТЕМ
- Разные переводы строк в 16ричную систему между юникс и виндовс системами. Относить ли переведенный файл к текстовым или к бинарным файлам заданным в .gitattributes.
[Скринкаст](https://youtu.be/3HLdTxLfg9g)
Настройка конфига core.autocrlf=true стоит по-умолчанию и ее достаточно.

- Разные предоставление прав на файлы. В виндовс любой файл читаемый является и исполняемым, код права всегда пишется ХХХ644. В юникс системах эти права разделены на читаемый и исполняемый.
[Скринкаст](https://youtu.be/KqsWpHq6SPk)

-------------------------------------
>[Видео - архивация zip коммита с версией проекта по тэгам версий](https://youtu.be/O4VSh2Z_LAk)

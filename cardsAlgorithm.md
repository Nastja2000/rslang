Шаг 1:
Подгружаются настройки. В зависимости от настроек, показываются карточки с определенным наполнением:
[карточки](https://pastenow.ru/9D4E7)
Шаг 2 - изучение карточки.
Шаг 2.1 - пользователь вводит значение:
А) Ввод правильный.
Текст в инпуте загорается зеленым.
Появляется перевод(слова и подсказок, если они есть).
Звучит автовоспроизведение слова, если в настройках отмечен данный пункт, и подсказок, если они присутствуют на карточке.
Карточка приобретает вид(приблизительно) :
[новый вид карточки](https://pastenow.ru/9D4EF)
А именно появляются три кнопки оценки сложности.
При наведении на красную кнопку, всплывает “подсказка”/уведомление что-то типа “Ничего страшного , давай повторим это слово еще раз”. При нажатии же красной кнопки, карточка добавляется в текущий массив, объект, в общем кучку со словами на данный день, чтобы появиться снова.
Если нажата жёлтая или зелёная кнопка, повторения в текущей тренировке не происходит.
После определения сложности происходит автоматический переход к следующей карточке.
С таким ходом развития событий в статистику заносятся следующие данные:
 - Если слово новое, то само слово, кол-во показов = 1, количество угаданных раз = 1, процент угадывания = 100%( или 1), сложность
 - Если не новое слово, то кол-во показов + 1, количество угаданных раз + 1, рассчитывается процент угадывания, сложность.



Б) Ввод не правильный.
В инпуте буквы, которые по расположению совпали, загораются зелёным, которые не совпали, красным/оранжевым. После данный текст уходит в плейсхолдер с сохранением цветов. Звучит автовоспроизведение слова, если в настройках отмечен данный пункт.
Данные действия повторяются, пока человек не введёт верный ответ.
Как только верный ответ введён, появляется перевод(слова и подсказок, если они есть), происходит автовоспроизведение слова и подсказок, если они есть,
сменяется карточка и ожидается оценка сложности. После оценки сложности происходит автоматический переход к следующей карточке (не забываем, что при нажатии красной, карточку требуется снова поместить в текущую колоду/массив/объект).
На данном этапе в статистику заносятся следующие данные:
 - Если слово новое, то само слово, кол-во показов = 1, количество угаданных раз = 0, процент угадывания = 0%( или 0), сложность
 - Если не новое слово, то кол-во показов + 1, количество угаданных раз остаётся прежним, рассчитывается процент угадывания, сложность.

2.2 - пользователь НЕ вводит значение(нажимает кнопку “Показать ответ”(иконка с вопросом)):
Показывается слово в инпуте, звучит автовоспроизведение слова и подсказок, если они есть и если автовоспроизведение включено, появляются кнопки оценки сложности и после оценки сложности происходит автоматический переход к следующей карточке.
В данном случае в статистику заносятся следующие данные:
 - Если слово новое, то само слово, кол-во показов = 1, количество угаданных раз = 0, процент угадывания = 0%( или 0), сложность
 - Если не новое слово, то кол-во показов + 1, количество угаданных раз остаётся прежним, рассчитывается процент угадывания, сложность.

! Примечания !

Иконки “Удалить”, “Сложно” активны всегда, кнопка “Показать ответ” становится неактивной на данной карточке после нажатия.
При нажатии кнопки “Удалить”, карточка сразу же исчезает с экрана и новое слово подгружается в текущую колоду.
При нажатии кнопки “Сложно”, в статистике ничего не меняется, карточка попадает в отдельный массив/объект/иное место хранения со всеми сложными словами. Данные слова отображаются в словаре, также их можно играть отдельно от всех.
При нажатии стрелки дальше происходит всё то, что происходит при нажатии кнопки “Показать ответ”
Как только пользователь доигрывает последнюю карточку показывается уведомление наподобии :

[уведомление](https://pastenow.ru/9D4EM)
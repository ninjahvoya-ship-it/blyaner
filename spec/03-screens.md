# Блянер — Карта экранов и прототипы

## Все экраны (16 страниц)

### Основные экраны
| # | Экран | URL прототипа | Описание |
|---|-------|---------------|----------|
| 1 | Неделя | [style6.html](https://planner-styles.vercel.app/style6.html) | 7 колонок, drag & drop, inline задачи |
| 2 | День | [day-view.html](https://planner-styles.vercel.app/day-view.html) | Список задач, подзадачи, таймер |
| 3 | Месяц | [month-view.html](https://planner-styles.vercel.app/month-view.html) | Сетка 5×7, дедлайны, статистика |
| 4 | Профиль | [profile.html](https://planner-styles.vercel.app/profile.html) | Статы, фокус, проекты, продуктивность |
| 5 | Настройки | [settings.html](https://planner-styles.vercel.app/settings.html) | Виджеты, аккаунт, данные, удаление |

### Авторизация
| # | Экран | URL прототипа | Описание |
|---|-------|---------------|----------|
| 6 | Вход/Регистрация | [login.html](https://planner-styles.vercel.app/login.html) | Табы, фиолетовый градиент, Google + Telegram |
| 7 | Забыли пароль | [forgot-password.html](https://planner-styles.vercel.app/forgot-password.html) | Email + success state |
| 8 | Ошибка 404 | [error.html](https://planner-styles.vercel.app/error.html) | «Бля, тут ничего нет» |

### Пустые состояния
| # | Экран | URL прототипа | Описание |
|---|-------|---------------|----------|
| 9 | Пустая неделя | [empty-week.html](https://planner-styles.vercel.app/empty-week.html) | Первый запуск, «Бля, пусто!» |
| 10 | Пустой день | [empty-day.html](https://planner-styles.vercel.app/empty-day.html) | «Бля, свободный день!» |

### Модалки и состояния
| # | Экран | URL прототипа | Описание |
|---|-------|---------------|----------|
| 11 | Смена пароля | [modal-password.html](https://planner-styles.vercel.app/modal-password.html) | Модалка с блюром |
| 12 | Удаление аккаунта | [modal-delete.html](https://planner-styles.vercel.app/modal-delete.html) | Ввод «УДАЛИТЬ» |
| 13 | Новый проект | [new-project.html](https://planner-styles.vercel.app/new-project.html) | Инлайн-форма в сайдбаре |
| 14 | Компоненты | [modals.html](https://planner-styles.vercel.app/modals.html) | Все модалки на одной странице |

### Вспомогательные
| # | Экран | URL прототипа | Описание |
|---|-------|---------------|----------|
| 15 | Мокап | [mockup.html](https://planner-styles.vercel.app/mockup.html) | Для презентаций/соцсетей |
| 16 | Варианты фокуса | [focus-variants.html](https://planner-styles.vercel.app/focus-variants.html) | 5 вариантов виджета (выбран #2 — полоска) |

---

## Сайдбар: состав по экранам

| Виджет | Неделя | День | Месяц | Профиль | Настройки |
|--------|--------|------|-------|---------|-----------|
| Лого «Бля, {имя}» | ✅ | ✅ | ✅ | ✅ | ✅ |
| Мини-календарь | ✅ | ✅ | ✅ | ✅ | ✅ |
| Сон | ✅ бары | ✅ прогресс | ✅ график 14д | — | — |
| Итого | — | ✅ | ✅ | — | — |
| На неделю | ✅ | ✅ | — | — | — |
| На месяц | — | — | ✅ | — | — |
| Проекты | ✅ | ✅ | — | — | — |
| Дедлайны | — | — | ✅ | — | — |
| Незавершённые | — | — | ✅ | — | — |

---

## Дизайн-токены

### Цвета
```
--sidebar:        #8B7EC8
--sidebar-dark:   #7A6DB8
--sidebar-light:  #9D92D4
--lime-card:      #D4E84D
--lime-dark:      #B8CC35
--main-bg:        #F4F3F8
--surface:        #FFFFFF
--text-dark:      #2D2B3D
--text-muted:     #8E8BA0
--grid-line:      #ECEAF4
--purple-card:    #B8ADE8
```

### Проектные цвета
```
purple:  #B8ADE8  (Book Tracker)
lime:    #D4E84D  (Beauty Tracker)
pink:    #F9A8D4  (OpenClaw)
yellow:  #FDE68A  (Личное)
blue:    #93C5FD
orange:  #FDBA74
teal:    #5EEAD4
red:     #FCA5A5
```

### Типографика
```
Font:    Inter
Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)
```

### Скругления
```
Фрейм:      32px
Карточки:    20-24px
Кнопки:      12-16px
Инпуты:      12px
Чекбоксы:    full (круг)
Иконки в квадрате: 12px
```

### Иконки
```
Библиотека:  Phosphor Icons
Стиль:       Light (ph ph-*)
Акценты:     Fill (ph-fill ph-*)
Размеры:     text-[8px] — text-2xl
```

/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

// Возьмите свой код из предыдущей практики

document.addEventListener('DOMContentLoaded', () => {
    
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    

    const adv = document.querySelectorAll('.promo__adv img'),
          poster = document.querySelector('.promo__bg'),
          genre = poster.querySelector('.promo__genre'),
          movieList = document.querySelector('.promo__interactive-list'),
          addForm = document.querySelector('form.add'),
          addInput = addForm.querySelector('.adding__input'),
          checkbox = addForm.querySelector('[type="checkbox"]');
    
    
    
    /*Для удобства преобразуем старые конструкции в функции.*/
    
    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };
    


    const makeChanges = () => {
        genre.textContent = 'Драма';

        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };
    

    
    const sortArr = (arr) => {
        arr.sort();
    };
    
    
    
    function createMovieList(films, parent) {
        parent.innerHTML = '';
        sortArr(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
            <li class="promo__interactive-item">${i + 1}. ${film}
                <div class="delete"></div>
            </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(films, parent);
            });
        });
    }
    




    /*Новые задания.*/

    /*Некоторые элементы DOM-дерева могут грузиться дольше, чем сам скрипт, из-за чего некоторые части кода 
    JS могут сработать некорректно. 

    Для предотвращения подобной проблемы существует событие load, оно срабатывает, когда наша страница полностью загружена.

    Чаще используется событие DOMContentLoaded, которое срабатывает, когда загрузится только DOM-структура, 
    не дожидаясь загрузки картинок, стилей и прочего.
    Для срабатывания этого события, поместим весь наш код в соответствующую структуру:
    document.addEventListener('DOMContentLoaded', () => {});*/



    /*Чтобы отследить отправку нашей формы существует обработчик событий submit.*/

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
              
               /*Для получения булинового значения чекбокса используется свойство checked.*/

        const favorite = checkbox.checked;
        
        /*Чтобы форма не принимала в себя пустые строки, воспользуемся условием if.*/

        if (newFilm) {
            
            /*Для проверки длины названия фильма воспользуемся еще одним условием if и методом строки substring().*/

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }
            
            /*Для добавления любимого фильма проверяем значение переменной favorite с помощью очередного условия if.*/

            if (favorite) {
                console.log('Добавляем любимый фильм');
            }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);

            createMovieList(movieDB.movies, movieList);

            /*Для создания новых элементов страницы воспользуемся уже имеющимся у нас кодом, который обернем в функцию.*/
        }

        /*После создания новых элементов, нам нужно очистить форму с помощью метода reset().*/

        event.target.reset();

        /*Для возможности удаления элементов из списка фильмов со страницы воспользуемся удалением родителя parentElement
        и удаления элемента из массива с помощью метода splice().
        Исполним это сразу внутри функции createMovieList().
        
        Для соблюдения нумерации элементов, после удаления одного из них, воспользуемся рекурсией (функция вызывает сама себя внутри).
        
        Для правильной сортировки элементов страницы после удаления элементов добавим функцию sortArr() внутрь функции createMovieList()*/
    });
      
    

    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);
});
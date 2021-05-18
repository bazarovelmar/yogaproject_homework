window.addEventListener('DOMContentLoaded', function() {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {                                              //Функция которая скрывает табы
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');                    //Удаляет класс show, но он не стоит  в HTML
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);  //скрываем все кроме элемента начиная с первого, кроме нулевого

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {                           //проверяем действительно ли элемент содержит hide
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }
    

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for(let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }

    });



    //timer


    let deadline = '2020-11-02';


    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),                     // вычитаем из дедлайна который задан в пермененной нами - дату настоящую new Date()
            seconds = Math.floor((t/1000) % 60),                                  //рассчитываем секунды и берет остаток после деления на 60,  от 60
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor ((t/(1000*60*60)));
        
        return {
            'total' : t,                        //Возвращаем в качестве результата переменнх t, hours, расчет тз предыдущиъ строк. т е функция присваивает значению этих переменных те рассчеты времен.
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        }

    }

    


    function setClock(id, endtime) {                        //функция установки времени
        
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);                           //выполняет функцию каждые 1 секунду
        


        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num){
                        if(num <= 9) {
                            return '0' + num;
                        } else return num;
                    };

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);
        

            if (t.total <=0) {                                    //Откуда взялся t.total? как он обращается к нему, если в переменной t.total не задан
                clearInterval(timeInterval);
            }

            
        }

    }

    setClock('timer', deadline);





//МОдальное окно
 
    let more = document.querySelector('.more'),                                                         
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        moreSecond = document.querySelectorAll('.description-btn');

    // console.log('description-btn');

    function AddModal() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    }
    
    more.addEventListener('click', AddModal);

    for(let i = 0; i < moreSecond.length; i++) {
        console.log(moreSecond[i]);
        moreSecond[i].addEventListener('click', AddModal);
    }

        

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });




//     //Домашнее задание 


//     class Options {
//         constructor (height, width, bg, fontSize, textAlign) {
//             this.height = height;
//             this.width = width;
//             this.bg = bg;
//             this.fontSize = fontSize;
//             this.textAlign = textAlign;
//         }

//     createDiv() {
//         let div = document.createElement('div');
//         // div.className = newDiv;
//         document.body.appendChild(div);
//         div.textContent =  "Текст для изменения стилей";
//         let param = `height:${this.height}px; width:${this.width}px; background-color:${this.bg}; font-size:${this.fontSize}px; text-align:${this.textAlign}`;
//         div.style.cssText = param;
//     }
// }

// const item = new Options(300, 350, "red", 14, "center");
// item.createDiv();
// console.log(item)





 //Form

    let message = {
        loading: 'Загрузка',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failture: 'ЧТо-то пошло не так...'
    }

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');  //Создает в ДОм новый блок див

        statusMessage.classList.add('status');    //Добавляет класс данной переменной



    form.addEventListener('submit', function(event) {                                  ////вешает обработчик событий submit (когда пользователь отправляет form) не на кнопку а на форму
    
        event.preventDefault();
        form.appendChild(statusMessage);                                                                                //вывести запрос


        let request = new XMLHttpRequest();                       //СОздаем запрос . помещаем новый конструкто

        request.open('POST', 'server.php');              //отправляем на сервер
        request.setRequestHeader ('Content-Type', 'application/x-www-from-urlencoded');    //настройка http запроса. Наш контент будет содержать данные из формы

        

        let formData = new FormData (form);                //для получения данных. В нее помещаем то что заполнил пользователь. Во внутрь конструкции отправить ту форму из которой хотим получить все даннеы пользователя

        request.send(formData);



        request.addEventListener('readystatechange', function() {                  //readystatechange - для того чтобы наблюдать за изменения состояния нашего запроса
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading; 

            } else  if (request.readyState === 4 && request.status == 200)  {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failture;
            }
            
            });



            for (let  i =0; i < input.length; i++) {                              //очищает инпут
                input[i].value = '';
            }
    

    });                                         














    //Создание слайдера


    let slideIndex = 1,                                                                         //отвечает за слайдер в тек момент- параметр текущего слайда
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');


    showSlides(slideIndex);                   //сразу показываем тот слайд 

    function showSlides(n) {                    //n то есть имеет один аргумент 
        
        //При окончании слайда, и при нажатии некст - возврат к 1 слайду


        if (n > slides.length) {                 //возврат справа к самому первому от последнего
            slideIndex = 1;

        }
        
        if (n < 1) {
            slideIndex = slides.length;         //Возврат к последнем слева
        }
        
        
        
        
        
        slides.forEach((item) => item.style.display = 'none');                              //возьмем слайды и переберем их. скроем все слайды
        
        dots.forEach((item) => item.classList.remove('dot-active'));                                                                                      //чтобы убрать со всех точек класс актив
        
        slides[slideIndex - 1].style.display = 'block';                                                                //который показываем 1 slide
        dots[slideIndex - 1].classList.add('dot-active');                                                              //Добавляет класс активновсти к 0 точке, то есть к 1
    }

    


    function plusSlides(n) {
        showSlides(slideIndex += n);    //когда перелистываем слайды вперед подставляем 1 и увеличиваем на 1 с двойкой как аргумент и в showslides попадает двойка и показывает второй слайд
    }

    //функция которая будет определять текующий слайд и устанавливать его

    function currentSlide(n) {
        showSlides(slideIndex = n);        //когда кликаем на 4 точку, в n передается 4 и показывает 4 слайд
    }


    prev.addEventListener('click', function() {
        plusSlides(-1);                                //уменьшаем слайдindex на единицу и делаем шаг назад
    });

    next.addEventListener('click', function() {
        plusSlides(1); 
    });


    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {                      //проводим делегирвоание событий. Проверяем тот элеменет на который кликнули на определенные праметры
            if (event.target.classList.contains('dot') && event.target == dots[i-1]) {       //узнаем тот элемент на который мы кликнули с помощью event.target
                currentSlide(i);
            }                                    
        }
    });




    //calc


    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

        totalValue.innerHTML = 0;



        persons.addEventListener('change', function() {
            persons = +this.value;  //с помощью this получаем тот элемент на котором происходит change        
            total = (daysSum + persons)*4000;

            if(restDays.value == '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

//верхние и нижний блок для проверки того что пользователь заполнил оба инпута
        restDays.addEventListener('change', function() {
            persons = +this.value;  //с помощью this получаем тот элемент на котором происходит change        
            total = (daysSum + persons)*4000;

            if(persons.value == '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
            
        });

        place.addEventListener('change', function() {
            if(restDays.value == '' || persons.value == '') {                        //проверяем поля инпутов при выборе Place
                totalValue.innerHTML = 0;
            } else {
                let a = total;             //при модификации данных (выберите базу), потомус что при последющих выборах он будет складывать все значения и расчет будет неверным
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;    //получим у определенного value
            }
        })
    });         


    //ошибка "Failed to load resource: the server responded with a status of 404 " не подключен jquery link
    









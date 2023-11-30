import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { ModalRoot, ModalPage, ModalPageHeader, Button, FormLayout, FormItem, Select, Input, PanelHeaderButton, Text } from '@vkontakte/vkui';

import CreateAffairModal from './CreateAffairModal';
import WriteAffairModal from './WriteAffairModal';

import './AffairModal.css';

const AffairModal = props => {

    var catygories = [
        {
            value: '0',
            label: '💼 Работа',
            color: '#FF9595'
        },
        {
            value: '1',
            label: '🏠 Домашние дела',
            color: '#FFD6BE'
        },
        {
            value: '2',
            label: '💪 Спорт',
            color: '#63AB58'
        },
        {
            value: '3',
            label: '🌍 Путешествия',
            color: '#A0FFF9'
        },
        {
            value: '4',
            label: '🏥 Здоровье',
            color: '#90FF8D'
        },
        {
            value: '5',
            label: '💰 Финансы',
            color: '#FDFF95'
        },
        {
            value: '6',
            label: '🎨 Хобби',
            color: '#FF9356'
        },
        {
            value: '7',
            label: '🎉 Досуг',
            color: '#DD95FF'
        },
        {
            value: '8',
            label: '📚 Учеба',
            color: '#83A5FF'
        },
        ]

    const [formFilledCategory, setFormFilledCategory] = useState(false);
    const [formFilledTime, setFormFilledTime] = useState(false);
    const [formFilledAffair, setFormFilledAffair] = useState(false);

    useEffect(() => {
        if (props.isTimerActive){
            addNewAffair();
            props.setIsTimerActive(false);
        }
    }, [props.isTimerActive]);

    const addNewAffair = async () => {
        // добавление нового дела в список и отправка на сервер
        var category = props.category;
        var affair = props.affair;

        const timerUnit = ['ч.', 'мин.', 'с.'];
        const durationArray = props.duration.split(' ');

        // Удаляем элемент из массива, если его значение равно 0
        for (let index = durationArray.length - 1; index >= 0; index--) {
            if (parseInt(durationArray[index], 10) === 0) {
                durationArray.splice(index, 1);
                console.log('Удалён по индексу ' + index);
            } else {
                durationArray[index] += " " + timerUnit[index];
                console.log('добавлено к элементу ' + durationArray[index]);
            }
        }


        // Объединяем массив обратно в строку
        var duration = durationArray.join(' ');

        console.log(duration); // Выводим отфильтрованную строку
        const newAffair = {
            id: Date.now(),
            category,
            affair,
            duration
        }

        duration = props.duration;

        const newAffairInServer = {
            id: Date.now(),
            category,
            affair,
            duration
        }
        
        console.log(newAffair)
        
        try {
            const response = await fetch(`/addAffair?userId=${props.userId}&date=${props.serverDate}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAffairInServer), // Преобразование в JSON
            });
    
            const data = await response.json();
            console.log(data); // Вывод ответа от сервера
    
            props.setAffairs([...props.affairs, newAffair]);
            close();
        } catch (error) {
            console.error(error); // Обработка ошибок
        }
    };

    const close = () => {
        setFormFilledCategory(false);
        setFormFilledTime(false);
        setFormFilledAffair(false);

        props.closeModal();
    };


	return(
        <ModalRoot activeModal={props.id} className={'modal-root'}>
            <CreateAffairModal 
                id={'create-affair'}
                go={props.go}
                close={close}
                onClose={() => close()}
                catygories={catygories}
                setCategory={props.setCategory}
                setAffair={props.setAffair}
                formFilledCategory={formFilledCategory}
                setFormFilledCategory={setFormFilledCategory}
                formFilledAffair={formFilledAffair}
                setFormFilledAffair={setFormFilledAffair}
            />

            <WriteAffairModal 
                id={'write-affair'} 
                go={props.go}
                close={close}
                addNewAffair={addNewAffair}
                onClose={() => close()}
                catygories={catygories}
                setCategory={props.setCategory}
                setDuration={props.setDuration}
                setAffair={props.setAffair}
                selectedDate={props.selectedDate}
                formFilledCategory={formFilledCategory}
                setFormFilledCategory={setFormFilledCategory}
                formFilledTime={formFilledTime}
                setFormFilledTime={setFormFilledTime}
                formFilledAffair={formFilledAffair}
                setFormFilledAffair={setFormFilledAffair}
            />
                
        </ModalRoot>
	)
};

AffairModal.propTypes = {
	id: PropTypes.string.isRequired,
	closeModal: PropTypes.func.isRequired,
    selectedDate: PropTypes.string.isRequired,
	affairs: PropTypes.array.isRequired,
	setAffairs: PropTypes.func.isRequired,
};

export default AffairModal;

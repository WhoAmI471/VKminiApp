import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { ModalRoot, ModalPage, ModalPageHeader, Button, FormLayout, FormItem, Select, Input, PanelHeaderButton, Text } from '@vkontakte/vkui';

import './AffairModal.css';

const AffairModal = props => {

    var catygories = [
        {
            value: '0',
            label: '💼 Работа',
            color: '#AF60FFB2'
        },
        {
            value: '1',
            label: '🏠 Домашние дела',
            color: '#FFBA52B2'
        },
        {
            value: '2',
            label: '💪 Спорт',
            color: '#6866E7B2'
        },
        {
            value: '3',
            label: '🌍 Путешествия',
            color: '#26D8FFB2'
        },
        {
            value: '4',
            label: '🏥 Здоровье',
            color: '#4FC98FB2'
        },
        {
            value: '5',
            label: '💰 Финансы',
            color: '#9694EF'
        },
        {
            value: '6',
            label: '🎨 Хобби',
            color: '#EE4949B2'
        },
        {
            value: '7',
            label: '🎉 Досуг',
            color: '#59775CB2'
        },
        {
            value: '8',
            label: '📚 Учеба',
            color: '#47F143B2'
        },
        ]

    var times = [
            {
                value: '0',
                label: '1 ч.',
                duration: '1 0 0'
            },
            {
                value: '1',
                label: '2 ч.',
                duration: '2 0 0'
            },
            {
                value: '2',
                label: '3 ч.',
                duration: '3 0 0'
            },
            {
                value: '3',
                label: '4 ч.',
                duration: '4 0 0'
            },
            {
                value: '4',
                label: '5 ч.',
                duration: '5 0 0'
            },
            {
                value: '5',
                label: '6 ч.',
                duration: '6 0 0'
            },
            {
                value: '6',
                label: '7 ч.',
                duration: '7 0 0'
            },
            {
                value: '7',
                label: '8 ч.',
                duration: '8 0 0'
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
            <ModalPage id="create-affair" onClose={() => close()}>
                <ModalPageHeader 
                    before={<Text className='modal-header'>Новое дело</Text>}
                    after={
                        <PanelHeaderButton onClick={() => close()}>
                            Отменить
                        </PanelHeaderButton>
                    }
                />

                <FormLayout>
                    <FormItem 
                        top="Выберите категорию" 
                        onChange={e => {
                            if (e.target.value) {
                                setFormFilledCategory(true);
                                props.setCategory([catygories[e.target.value]['label'], catygories[e.target.value]['color']])
                            } else {
                                setFormFilledCategory(false);
                            }
                        }}
                    >
                        <Select
                            options={catygories}
                        />
                    </FormItem>

                    <FormItem 
                        top="Назовите ваше дело"
                        onChange={e => {
                            if (e.target.value) {
                                setFormFilledAffair(true);
                                props.setAffair(e.target.value)
                            } else {
                                setFormFilledAffair(false);
                            }
                        }}
                    >
                        <Input
                            placeholder="Отмечаю др"
                        />
                    </FormItem>

                    <div className='btn-padding'>
                        <Button 
                            className='create-btn'
                            stretched={true}
                            appearance=''
                            onClick={props.go} 
                            data-to='timer'
                            disabled={!(formFilledCategory && formFilledAffair)}
                        >
                            Создать
                        </Button>
                    </div>
                </FormLayout>
            </ModalPage>

            <ModalPage id="write-affair" onClose={() => close()}>
                <ModalPageHeader 
                    before={<Text className='modal-header'>Новое дело</Text>}
                    after={
                        <PanelHeaderButton onClick={() => props.closeModal()}>
                            Отменить
                        </PanelHeaderButton>
                    }
                />

                <FormLayout>
                    
                    <FormItem 
                        top="Выбранная дата" 
                        onChange={e => {
                            if (e.target.value) {
                                setFormFilledCategory(true);
                            } else {
                                setFormFilledCategory(false);
                            }
                        }}
                    >
                        <Input
                            value={props.selectedDate}
                            disabled
                        />
                    </FormItem>

                    <FormItem 
                        top="Выберите категорию" 
                        onChange={e => {
                            if (e.target.value) {
                                setFormFilledCategory(true);
                                props.setCategory([catygories[e.target.value]['label'], catygories[e.target.value]['color']])
                            } else {
                                setFormFilledCategory(false);
                            }
                        }}
                    >
                        <Select
                            options={catygories}
                        />
                    </FormItem>

                    <FormItem 
                        top="Укажите длительность дела" 
                        onChange={e => {
                            if (e.target.value) {
                                setFormFilledTime(true);
                                props.setDuration(times[e.target.value]['duration']);
                            } else {
                                setFormFilledTime(false);
                            }
                        }}
                    >
                        <Select
                            options={times}
                        />
                    </FormItem>

                    <FormItem 
                        top="Назовите ваше дело"
                        onChange={e => {
                            if (e.target.value) {
                                setFormFilledAffair(true);
                                props.setAffair(e.target.value)
                            } else {
                                setFormFilledAffair(false);
                            }
                        }}
                    >
                        <Input
                            placeholder="Отмечаю др"
                        />
                    </FormItem>

                    <div className='btn-padding'>
                        <Button 
                            className='create-btn'
                            stretched={true}
                            appearance=''
                            onClick={() => addNewAffair()}
                            disabled={!(formFilledCategory && formFilledTime && formFilledAffair)}
                        >
                            Создать
                        </Button>
                    </div>
                </FormLayout>
            </ModalPage>
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

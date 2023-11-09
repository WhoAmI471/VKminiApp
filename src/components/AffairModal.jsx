import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ModalRoot, ModalPage, ModalPageHeader, Button, FormLayout, FormItem, Select, Input, PanelHeaderButton, Text } from '@vkontakte/vkui';

import './AffairsModal.css';

const AffairModal = props => {

    var catygories = [
        {
            value: '0',
            label: 'Работа',
        },
        {
            value: '1',
            label: 'Домашние дела',
        },
        {
            value: '2',
            label: 'Спорт',
        },
        {
            value: '3',
            label: 'Путешествия',
        },
        {
            value: '4',
            label: 'Здоровье',
        },
        {
            value: '5',
            label: 'Финансы',
        },
        {
            value: '6',
            label: 'Время с семьёй',
        },
        {
            value: '7',
            label: 'Хобби',
        },
        {
            value: '8',
            label: 'Социальные связи',
        },
        {
            value: '9',
            label: 'Досуг',
        },
        ]

    var times = [
            {
                value: '0',
                label: '1 ч.',
            },
            {
                value: '1',
                label: '2 ч.',
            },
            {
                value: '2',
                label: '3 ч.',
            },
            {
                value: '3',
                label: '4 ч.',
            },
            {
                value: '4',
                label: '5 ч.',
            },
            {
                value: '5',
                label: '6 ч.',
            },
            {
                value: '6',
                label: '7 ч.',
            },
            {
                value: '7',
                label: '8 ч.',
            },
        ]

    var emojis = [
        {
            value: '0',
            label: '🎂',
        },
        {
            value: '1',
            label: '🎉',
        },
        {
            value: '2',
            label: '📅',
        },
    ]

    const [formFilledCategory, setFormFilledCategory] = useState(false);
    const [formFilledTime, setFormFilledTime] = useState(false);
    const [formFilledEmoji, setFormFilledEmoji] = useState(false);
    const [formFilledAffair, setFormFilledAffair] = useState(false);

    const [category, setCategory] = useState('');
    const [time, setTime] = useState('');
    const [emoji, setEmoji] = useState('');
    const [affair, setAffair] = useState('');



    const addNewAffair = async () => {
        const newAffair = {
            id: Date.now(),
            emoji,
            category,
            affair
        }
        
        console.log(newAffair)
        
        try {
            const response = await fetch('https://127.0.0.1:5000/addAffair', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAffair), // Преобразование в JSON
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
        setFormFilledEmoji(false);
        setFormFilledAffair(false);

        props.closeModal();
    };


	return(
        <ModalRoot activeModal={props.id} className={'modal-root'}>
            <ModalPage id="create-affair">
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
                                setCategory(catygories[e.target.value]['label'])
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
                        top="Выбрать эмодзи"
                        onChange={e => {
                            if (e.target.value) {
                                setFormFilledEmoji(true);
                                setEmoji(emojis[e.target.value]['label'])
                                console.log(emojis[e.target.value]['label'])
                                console.log(emoji)
                            } else {
                                setFormFilledEmoji(false);
                            }
                        }}
                    >
                        <Select
                            options={emojis}
                        />
                    </FormItem>
                    <FormItem 
                        top="Назовите ваше дело"
                        onChange={e => {
                            if (e.target.value) {
                                setFormFilledAffair(true);
                                setAffair(e.target.value)
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
                            disabled={!(formFilledCategory && formFilledEmoji && formFilledAffair)}
                        >
                            Создать
                        </Button>
                    </div>
                </FormLayout>
            </ModalPage>
            <ModalPage id="write-affair">
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
                        top="Выбрать эмодзи"
                        onChange={e => {
                            if (e.target.value) {
                                setFormFilledEmoji(true);
                            } else {
                                setFormFilledEmoji(false);
                            }
                        }}
                    >
                        <Select
                            // placeholder={emoji[0]["label"]}
                            options={emojis}
                        />
                    </FormItem>

                    <FormItem 
                        top="Назовите ваше дело"
                        onChange={e => {
                            if (e.target.value) {
                                setFormFilledAffair(true);
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
                            onClick={() => props.closeModal()}
                            disabled={!(formFilledCategory && formFilledTime && formFilledEmoji && formFilledAffair)}
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

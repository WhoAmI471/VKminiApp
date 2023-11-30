import React from 'react';

import { ModalPage, ModalPageHeader, Button, FormLayout, FormItem, Select, Input, PanelHeaderButton, Text } from '@vkontakte/vkui';


const WriteAffairModal = ({
    id, 
    close, 
    addNewAffair,
    catygories, 
    setCategory, 
    setDuration,
    setAffair, 
    selectedDate,
    formFilledCategory, 
    setFormFilledCategory,
    formFilledTime, 
    setFormFilledTime,
    formFilledAffair, 
    setFormFilledAffair,
    }) => {


    return(
        <ModalPage id={id} onClose={() => close()}>
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
                        value={selectedDate}
                        disabled
                    />
                </FormItem>

                <FormItem 
                    top="Выберите категорию" 
                    onChange={e => {
                        if (e.target.value) {
                            setFormFilledCategory(true);
                            setCategory([catygories[e.target.value]['label'], catygories[e.target.value]['color']])
                        } else {
                            setFormFilledCategory(false);
                        }
                    }}
                >
                    <Select
                        id="select-category-id"
                        placeholder="Не выбран"
                        options={catygories}
                    />
                </FormItem>

                <FormItem 
                    top="Укажите длительность дела" 
                    onChange={e => {
                        if (e.target.value) {
                            const [hours, minutes] = e.target.value.split(":");
                            const duration = parseInt(hours) + ' ' + parseInt(minutes) + ' 0';
                            setFormFilledTime(true);
                            setDuration(duration);
                        } else {
                            setFormFilledTime(false);
                        }
                    }}
                >
                    <Input type='time' defaultValue="00:00"/>
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
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            e.target.blur();
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
    );
}


export default WriteAffairModal;
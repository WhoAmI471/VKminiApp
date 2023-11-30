import React from 'react';

import { ModalPage, ModalPageHeader, Button, FormLayout, FormItem, Select, Input, PanelHeaderButton, Text } from '@vkontakte/vkui';

// import './AffairModal.css';


const CreateAffairModal = ({
    id, 
    go, 
    close, 
    catygories, 
    setCategory, 
    setAffair, 
    formFilledCategory, 
    setFormFilledCategory, 
    formFilledAffair, 
    setFormFilledAffair 
    }) => {

    return (
        <ModalPage id={id}>
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
                            onClick={go} 
                            data-to='timer'
                            disabled={!(formFilledCategory && formFilledAffair)}
                        >
                            Создать
                        </Button>
                    </div>
                </FormLayout>
            </ModalPage>
    );
}


export default CreateAffairModal;
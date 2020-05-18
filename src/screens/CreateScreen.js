import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, TextInput, Button, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { THEME } from '../theme'
import { useDispatch } from 'react-redux'
import { addPost } from '../store/actions/post'
import { PhotoPicker } from '../components/PhotoPicker'

export const CreateScreen = ({ navigation }) => {

    navigation.setOptions({
        title: 'Новый пост',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item title='Toggle Drawer' iconName='ios-menu' onPress={() => navigation.toggleDrawer()} />
            </HeaderButtons>
        )
    })

    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const imgRef = useRef()

    const saveHandler = () => {
        const post = {
            date: new Date().toJSON(),
            text,
            booked: false,
            img: imgRef.current,
        }
        dispatch(addPost(post))
        navigation.navigate('Main')
        setText('')
    }

    const photoPickHandler = uri => {
        imgRef.current = uri
    }

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>
                        Создать новый пост
            </Text>
                    <TextInput
                        style={styles.textarea}
                        placeholder='Введите текст заметки'
                        value={text}
                        onChangeText={setText}
                        multiline={true}
                    />
                    <PhotoPicker onPick={photoPickHandler} />
                    <Button
                        title='Создать пост'
                        color={THEME.MAIN_COLOR}
                        onPress={saveHandler}
                        disabled={!text}
                    />
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontFamily: 'open-regular',
        textAlign: 'center',
        marginVertical: 10,
    },
    textarea: {
        padding: 10,
        marginBottom: 10,
    }
})
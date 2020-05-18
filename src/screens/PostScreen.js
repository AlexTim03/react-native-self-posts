import React from 'react'
import { View, Text, StyleSheet, Image, Button, ScrollView, Alert } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { useDispatch, useSelector } from 'react-redux'
import { toogleBooked, removePost } from '../store/actions/post'
import { THEME } from '../theme'

export const PostScreen = ({ navigation, route }) => {

    const postId = route.params.postId
    const allPosts = useSelector(state => state.post.allPosts)
    const post = allPosts.find(p => p.id === postId)
    if (!post) {
        return null
    }

    const date = route.params.date
    const iconName = post.booked ? 'ios-star' : 'ios-star-outline'

    const dispatch = useDispatch()

    navigation.setOptions({
        title: `Пост от ${new Date(date).toLocaleDateString()}`,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item title='Booked' iconName={iconName} onPress={() => dispatch(toogleBooked(post))} />
            </HeaderButtons>
        ),
    })

    const removeHandler = () => {
        Alert.alert(
            "Удаление поста",
            "Вы точно хотите удалить пост?",
            [
                {
                    text: "Отменить",
                    style: "cancel"
                },
                {
                    text: "Удалить",
                    style: 'destructive',
                    onPress: () => {
                        navigation.navigate('Main')
                        dispatch(removePost(postId))
                    }
                }
            ],
            { cancelable: false }
        )
    }

    return (
        <ScrollView>
            <Image source={{ uri: post.img }} style={styles.image} />
            <View style={styles.textWrap} >
                <Text style={styles.title} >{post.text}</Text>
            </View>
            <Button title='Удалить' color={THEME.DANGER_COLOR} onPress={removeHandler} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
    },
    textWrap: {
        padding: 10,
    },
    title: {
        fontFamily: 'open-regular'
    }
})
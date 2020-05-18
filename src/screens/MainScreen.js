import React, { useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { PostList } from '../components/PostList'
import { useDispatch, useSelector } from 'react-redux'
import { loadPosts } from '../store/actions/post'
import { THEME } from '../theme'


export const MainScreen = ({ navigation }) => {

    const openPostHandler = post => {
        navigation.navigate('Post', { postId: post.id, date: post.date })
    }

    navigation.setOptions({
        title: 'Мой блог',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item title='Take foto' iconName='ios-camera' onPress={() => navigation.navigate('Create')} />
            </HeaderButtons>
        ),
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item title='Toggle Drawer' iconName='ios-menu' onPress={() => navigation.toggleDrawer()} />
            </HeaderButtons>
        )
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadPosts())
    }, [dispatch])

    const allPosts = useSelector(state => state.post.allPosts)
    const loading = useSelector(state => state.post.loading)

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator color={THEME.MAIN_COLOR} />
            </View>
        )
    }

    return <PostList data={allPosts} onOpen={openPostHandler} />
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

import { StyleSheet, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#0B0A27',
        paddingTop: StatusBar.currentHeight
    },
    safeArea: {
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        height: 70,
        paddingTop: 10,
        paddingLeft: 20,
        flexDirection: 'row',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    body: {
        flex: 3,
        color: '#fff',
        flexDirection: 'column',
        padding: 20
    },
    backArrow: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
    },
    smallIconLogo: {
        height: 60,
        resizeMode: 'contain',
        width: 120
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    musicPhrases: {
        color: '#C1C2F980',
        fontSize: 20,
        paddingRight: 60,
        height: 80
    },
    horizontalLine: {
        borderBottomColor: '#C1C2F980',
        borderBottomWidth: 1,
        width: 100,
        margin: 20
    },
    letsStartButton: {
        width: 170,
        backgroundColor: '#F1304D',
        height: 45,
        borderRadius: 22.5,
    },
    letsStartButtonText: {
        color: '#fff',
        fontSize: 20,
        height: 45,
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    backHeaderText: {
        color: '#F1304D',
        fontSize: 19,
        height: 30,
        marginLeft: 10,
        textAlignVertical: 'center',
        textAlign: 'center'
    },
});
import {Alert} from 'react-native';
import I18n from 'utils/language/i18n';
import NetInfo from '@react-native-community/netinfo';

export function handleNetWorkError() {
	NetInfo.fetch().then(state => {
		if (!state.isConnected) {
			showAlert(I18n.t('COMMON_ERROR'), I18n.t('COMMON_ERROR_TITTLE'));
		}
	});
}

export function showAlert(content: string, title: string = '', textSuccess = 'OK') {
	setTimeout(() => {
		Alert.alert(title, content, [{text: textSuccess, onPress: () => {}}], {
			cancelable: false,
		});
	}, 100);
}

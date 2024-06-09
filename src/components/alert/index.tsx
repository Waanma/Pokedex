import React from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { useStore } from "../../store/store";

interface Props {
	showAlert: boolean;
	hideAlert: () => void;
}

const Alert: React.FC<Props> = ({ showAlert, hideAlert }) => {
	const onPressClear = (hideAlert: () => void) => {
		useStore.getState().clearFavorites();
		hideAlert();
	};
	return (
		<AwesomeAlert
			show={showAlert}
			showProgress={true}
			progressColor="green"
			title="Free all pokemons?"
			message="Are you sure you want to free all pokemons?"
			contentContainerStyle={{ width: "100%", height: "30%" }}
			contentStyle={{ padding: 10 }}
			cancelButtonTextStyle={{ padding: 5 }}
			confirmButtonTextStyle={{ padding: 5 }}
			closeOnTouchOutside={true}
			closeOnHardwareBackPress={false}
			showCancelButton={true}
			showConfirmButton={true}
			cancelText="No, cancel"
			confirmText="Yes, free all!"
			confirmButtonColor="#14cc89"
			onCancelPressed={hideAlert}
			onConfirmPressed={() => onPressClear(hideAlert)}
		/>
	);
};

export default Alert;

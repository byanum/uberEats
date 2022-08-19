import { Marker } from "react-native-maps";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import styles from "../../screens/OrderDelivery/styles";

const CustomMarker = ({ data, type }) => {
  return (
    <Marker
      coordinate={{
        latitude: data.lat,
        longitude: data.lng,
      }}
      title={data.name}
      description={data.address}
    >
      {type === "RESTAURANT" ? (
        <FontAwesome5
          name="shopping-basket"
          size={30}
          color="black"
          style={{ marginHorizontal: 5 }}
        />
      ) : (
        <FontAwesome5
          name="user"
          size={30}
          color="black"
          style={{ marginHorizontal: 5 }}
        />
      )}
    </Marker>
  );
};
export default CustomMarker;

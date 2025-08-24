import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PaymentMethod } from "../../types/ride";

interface PaymentMethodCardProps {
  payment: PaymentMethod;
  isSelected: boolean;
  onSelect: (payment: PaymentMethod) => void;
}

export const PaymentMethodCard = ({
  payment,
  isSelected,
  onSelect,
}: PaymentMethodCardProps) => {
  return (
    <TouchableOpacity
      style={[styles.paymentOption, isSelected && styles.paymentOptionSelected]}
      onPress={() => onSelect(payment)}
      activeOpacity={0.7}
    >
      <View style={styles.paymentIcon}>
        <Ionicons name={payment.icon} size={20} color="#374151" />
      </View>
      <Text style={styles.paymentName}>{payment.name}</Text>
      {isSelected && (
        <Ionicons name="checkmark-circle" size={16} color="#3b82f6" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    gap: 12,
  },
  paymentOptionSelected: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#3b82f6",
  },
  paymentIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  paymentName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },
});

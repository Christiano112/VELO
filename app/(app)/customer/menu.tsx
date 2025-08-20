import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AnimatedHeader } from "@/components/ui/AnimatedHeader";
import Avatar from "@/components/ui/Avatar";
import ConfirmationBottomSheet from "@/components/ui/ConfirmationBottomSheet";
import DeleteAccountBottomSheet from "@/components/ui/DeleteAccountBottomSheet";
import { COLORS } from "@/constants/Colors";
import { FONT_SIZE, SPACING } from "@/constants/GlobalStyles";

const CustomerMenu = () => {
  const router = useRouter();
  const logoutSheetRef = useRef<any>(null);
  const deleteSheetRef = useRef<any>(null);
  const [deleteReason, setDeleteReason] = useState("");

  const handleLogout = () => {
    console.log("Logout pressed");
    logoutSheetRef.current?.expand();
  };

  const handleDeleteAccount = () => {
    console.log("Delete account pressed");
    deleteSheetRef.current?.expand();
  };

  const confirmLogout = () => {
    Keyboard.dismiss();
    logoutSheetRef.current?.close();
    router.replace("/auth/login");
  };

  const cancelLogout = () => {
    Keyboard.dismiss();
    logoutSheetRef.current?.close();
  };

  const confirmDelete = () => {
    console.log("Confirm delete with reason:", deleteReason);
    Keyboard.dismiss();
    deleteSheetRef.current?.close();
    setDeleteReason("");
    // TODO: Implement account deletion flow
  };

  const cancelDelete = () => {
    Keyboard.dismiss();
    deleteSheetRef.current?.close();
    setDeleteReason("");
  };

  const { headerComponent, scrollProps, headerHeight } = AnimatedHeader({
    title: "Menu",
    transitionThreshold: 100,
  });

  const MenuSection = ({
    children,
    style,
  }: {
    children: React.ReactNode;
    style?: any;
  }) => <ThemedView style={[styles.menuSection, style]}>{children}</ThemedView>;

  const MenuItem = ({
    icon,
    title,
    onPress,
    showArrow = true,
    isDestructive = false,
  }: {
    icon: React.ReactNode;
    title: string;
    onPress: () => void;
    showArrow?: boolean;
    isDestructive?: boolean;
  }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <ThemedView style={styles.menuItemLeft}>
        <ThemedView style={styles.iconContainer}>{icon}</ThemedView>
        <ThemedText
          style={[styles.menuItemText, isDestructive && styles.destructiveText]}
          type="defaultMedium"
        >
          {title}
        </ThemedText>
      </ThemedView>
      {showArrow && (
        <Ionicons name="chevron-forward" size={16} color={COLORS.light.icon} />
      )}
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      {headerComponent}

      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: headerHeight }]}
        showsVerticalScrollIndicator={false}
        {...scrollProps}
      >
        {/* Profile Section */}
        <ThemedView style={styles.profileSection}>
          <Avatar name="Simran Thappar" />
          <ThemedView style={styles.profileText}>
            <ThemedText style={styles.profileName} type="defaultSemiBold">
              Simran Thappar
            </ThemedText>
            <ThemedText style={styles.profilePhone} type="tiny">
              +91 70945-67890
            </ThemedText>
          </ThemedView>
          <TouchableOpacity onPress={() => router.push("/customer/profile")}>
            <Feather name="edit-2" size={16} color={COLORS.light.icon} />
          </TouchableOpacity>
        </ThemedView>

        {/* Main Menu Section */}
        <MenuSection>
          <MenuItem
            icon={
              <MaterialIcons name="directions-car" size={24} color="#394347" />
            }
            title="My Rides"
            onPress={() => router.push("/customer/rides")}
          />
          <ThemedView style={styles.separator} />
          <MenuItem
            icon={<MaterialIcons name="schedule" size={24} color="#394347" />}
            title="Scheduled Rides"
            onPress={() => router.push("/customer/rides")}
          />
          <ThemedView style={styles.separator} />
          <MenuItem
            icon={<MaterialIcons name="payment" size={24} color="#394347" />}
            title="Payment Methods"
            onPress={() => router.push("/customer/payment-methods")}
          />
          <ThemedView style={styles.separator} />
          <MenuItem
            icon={
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#394347"
              />
            }
            title="Notifications"
            onPress={() => router.push("/customer/notification")}
          />
          <ThemedView style={styles.separator} />
          <MenuItem
            icon={
              <MaterialIcons
                name="contact-emergency"
                size={24}
                color="#394347"
              />
            }
            title="Emergency Contacts"
            onPress={() => router.push("/customer/contacts")}
          />
        </MenuSection>

        {/* Legal Section */}
        <MenuSection>
          <ThemedView style={styles.separator} />
          <MenuItem
            icon={
              <Ionicons name="help-circle-outline" size={24} color="#394347" />
            }
            title="Help"
            onPress={() => router.push("/legal/help")}
          />
          <MenuItem
            icon={
              <Ionicons
                name="document-text-outline"
                size={24}
                color="#394347"
              />
            }
            title="Terms and Conditions"
            onPress={() => router.push("/legal/terms-conditions")}
            showArrow={false}
          />
          <ThemedView style={styles.separator} />
          <MenuItem
            icon={
              <MaterialIcons name="privacy-tip" size={24} color="#394347" />
            }
            title="Privacy Policy"
            onPress={() => router.push("/legal/privacy-policy")}
            showArrow={false}
          />
        </MenuSection>

        {/* Logout Section */}
        <MenuSection>
          <MenuItem
            icon={<MaterialIcons name="logout" size={24} color="#394347" />}
            title="Logout"
            onPress={handleLogout}
            showArrow={false}
          />
        </MenuSection>

        {/* Delete Account Section */}
        <MenuSection style={styles.lastSection}>
          <MenuItem
            icon={
              <MaterialIcons
                name="delete-outline"
                size={24}
                color={COLORS.light.red}
              />
            }
            title="Delete Account"
            onPress={handleDeleteAccount}
            showArrow={false}
            isDestructive={true}
          />
        </MenuSection>
      </ScrollView>

      {/* Logout Confirmation Bottom Sheet */}
      <ConfirmationBottomSheet
        ref={logoutSheetRef}
        title="Are you sure you want to Logout your account?"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />

      {/* Delete Account Confirmation Bottom Sheet */}
      <DeleteAccountBottomSheet
        ref={deleteSheetRef}
        reason={deleteReason}
        onChangeReason={setDeleteReason}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </ThemedView>
  );
};

export default CustomerMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: SPACING.large,
  },
  profileSection: {
    backgroundColor: COLORS.light.inputBg,
    borderRadius: SPACING.medium,
    padding: SPACING.normal,
    marginVertical: SPACING.large,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.BMedium,
  },
  profileText: {
    flex: 1,
    backgroundColor: "transparent",
  },
  profileName: {
    fontSize: FONT_SIZE.large,
    color: COLORS.light.text,
    marginBottom: SPACING.small,
  },
  profilePhone: {
    fontSize: FONT_SIZE.small,
    color: COLORS.light.text,
    opacity: 0.5,
  },
  menuSection: {
    backgroundColor: COLORS.light.inputBg,
    borderRadius: SPACING.medium,
    marginBottom: SPACING.normal,
    borderWidth: 1,
    borderColor: COLORS.light.borderColor,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING.BMedium,
    paddingHorizontal: SPACING.normal,
    paddingVertical: SPACING.medium,
  },
  menuItemLeft: {
    gap: SPACING.BMedium,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "transparent",
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8ECF4",
  },
  menuItemText: {
    fontSize: FONT_SIZE.medium,
    color: COLORS.light.text,
  },
  destructiveText: {
    color: COLORS.light.red,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.light.text,
    opacity: 0.1,
    marginLeft: 61,
    marginRight: SPACING.normal,
  },
  lastSection: {
    marginBottom: SPACING.xxLarge,
  },
});

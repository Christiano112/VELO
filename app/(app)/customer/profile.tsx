import { StyleSheet } from "react-native";

import { AppButton } from "@/components/form/AppButton";
import AppInput from "@/components/form/AppInput";
import ScrollContainer from "@/components/layout/HeaderScroll";
import { ThemedView } from "@/components/ThemedView";
import { ProfileImage } from "@/components/ui/ProfileImage";
import { SPACING } from "@/constants/GlobalStyles";
import { useSubmit } from "@/hooks/useSubmit";
import { UpdateProfileFormData } from "@/types/form";
import { updateProfileSchema } from "@/utils/schema";

const CustomerProfile = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useSubmit<UpdateProfileFormData>(updateProfileSchema, {});

  const onSubmit = (data: UpdateProfileFormData) => {
    console.log(data);
  };

  return (
    <ScrollContainer title="Profile">
      <ThemedView style={styles.content}>
        <ProfileImage id="avatar" control={control} />
        <ThemedView style={styles.names}>
          <AppInput
            id="firstName"
            placeholder="First Name"
            control={control}
            errorMessage={errors.firstName?.message}
            autoComplete="given-name"
            containerStyle={{ width: "55%" }}
          />
          <AppInput
            id="lastName"
            placeholder="Last Name"
            control={control}
            errorMessage={errors.lastName?.message}
            autoComplete="off"
            importantForAutofill="no"
            containerStyle={{ width: "55%" }}
          />
        </ThemedView>
        <AppInput
          id="phoneNumber"
          placeholder="Phone Number"
          control={control}
          errorMessage={errors.phoneNumber?.message}
          autoComplete="tel"
          type="tel"
          leftIconName="phone"
        />
        <AppInput
          id="email"
          placeholder="Email"
          control={control}
          errorMessage={errors.email?.message}
          autoComplete="email"
          type="email"
          leftIconName="email"
        />
      </ThemedView>
      <ThemedView style={styles.buttonContainer}>
        <AppButton
          title="Save"
          onPress={handleSubmit(onSubmit)}
          isDisabled={!isDirty}
        />
      </ThemedView>
    </ScrollContainer>
  );
};

export default CustomerProfile;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: SPACING.normal,
  },
  names: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: SPACING.medium,
    marginHorizontal: "auto",
    width: "88%",
    marginTop: SPACING.normal,
  },
  buttonContainer: {
    marginVertical: SPACING.xxLarge,
    paddingHorizontal: SPACING.medium,
  },
});

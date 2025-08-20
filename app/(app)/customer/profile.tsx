import { ScrollView, StyleSheet } from "react-native";

import AppButton from "@/components/form/AppButton";
import AppInput from "@/components/form/AppInput";
import { ThemedView } from "@/components/ThemedView";
import { AnimatedHeader } from "@/components/ui/AnimatedHeader";
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

  const { headerComponent, scrollProps, headerHeight } = AnimatedHeader({
    title: "Profile",
    transitionThreshold: 100,
  });

  return (
    <ThemedView style={styles.container}>
      {headerComponent}

      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingTop: headerHeight },
        ]}
        showsVerticalScrollIndicator={false}
        {...scrollProps}
      >
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
            type="form"
            onPress={handleSubmit(onSubmit)}
            isDisabled={!isDirty}
          >
            Save
          </AppButton>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};

export default CustomerProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: SPACING.medium,
    flex: 1,
  },
  content: {
    paddingHorizontal: SPACING.medium,
    marginVertical: SPACING.large,
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

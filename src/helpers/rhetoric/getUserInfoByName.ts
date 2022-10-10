export type PredefinedUserName = "Witch" | "Bear" | "Duck" | "Dog";
export function getUserInfoByName(name: PredefinedUserName) {
  return {
    Witch: {
      bodyModel: "WitchModel" as const,
      handModel: "CauldronModel" as const,
      profileImage:
        "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/witch/thumbnail.png",
    },
    Bear: {
      bodyModel: "BearModel" as const,
      handModel: "HoneyModel" as const,
      profileImage:
        "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bear/thumbnail.png",
    },
    Duck: {
      bodyModel: "DuckModel" as const,
      handModel: "CornModel" as const,
      profileImage:
        "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/thumbnail.png",
    },
    Dog: {
      bodyModel: "DogModel" as const,
      handModel: "WholerHamModel" as const,
      profileImage:
        "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/dog/thumbnail.png",
    },
  }[name];
}

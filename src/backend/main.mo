import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

actor {
  type DiaryEntry = {
    date : Text;
    mood : Text;
    reflection : Text;
  };

  let diaryEntries = Map.empty<Principal, [DiaryEntry]>();

  // Motivational messages
  let motivationalMessages : [Text] = [
    "Take a deep breath. You're doing better than you think.",
    "Mindfulness is a journey, not a destination.",
    "Every moment is a fresh beginning.",
    "Peace comes from within. Do not seek it without.",
    "Small steps every day lead to big changes.",
    "You have the power to create calm within yourself.",
    "Let go of what you can't control. Focus on what you can.",
    "Be present in this moment. It is all you truly have.",
    "Your mind is a garden. Cultivate positive thoughts.",
    "Progress, not perfection, is the goal.",
    // New life-centric motivational messages
    "Life is a precious gift. Cherish every moment.",
    "Your existence has meaning, purpose, and value.",
    "Every day is an opportunity to create beautiful memories.",
    "You are worthy of love, happiness, and peace.",
    "The world is a better place because you are in it.",
    "Life's challenges help you grow stronger and wiser.",
    "Never underestimate the impact you have on others.",
    "Your journey is unique and irreplaceable.",
    "Embrace life with gratitude and curiosity.",
    "You have the strength to overcome any obstacle.",
  ];

  public query ({ caller }) func getAllMotivationalMessages() : async [Text] {
    Array.tabulate<Text>(
      motivationalMessages.size(),
      func(i) { motivationalMessages[i] },
    );
  };

  public shared ({ caller }) func addDiaryEntry(date : Text, mood : Text, reflection : Text) : async () {
    let newEntry : DiaryEntry = {
      date;
      mood;
      reflection;
    };

    let currentEntries = switch (diaryEntries.get(caller)) {
      case (null) { [] };
      case (?entries) { entries };
    };

    diaryEntries.add(caller, currentEntries.concat([newEntry]));
  };

  public query ({ caller }) func getMyEntries() : async [DiaryEntry] {
    switch (diaryEntries.get(caller)) {
      case (null) { Runtime.trap("No entries found for this user") };
      case (?entries) { entries };
    };
  };
};

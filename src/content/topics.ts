/**
 * Research topics of the Sources section (MASTER_PLAN section 11). Claims are
 * tagged with topics; a source's topics are those of the public claims that
 * cite it, so a source never gains a topic it does not support on this site.
 */
export type TopicId =
  | "bci"
  | "neuroprosthetics"
  | "sensory-feedback"
  | "embodiment"
  | "body-ownership"
  | "vr-rehabilitation"
  | "decoding"
  | "stimulation";

export const TOPICS: readonly { id: TopicId; label: string }[] = [
  { id: "bci", label: "Brain-Computer Interfaces" },
  { id: "neuroprosthetics", label: "Neuroprosthetics" },
  { id: "sensory-feedback", label: "Sensory Feedback" },
  { id: "embodiment", label: "Virtual Embodiment" },
  { id: "body-ownership", label: "Body Ownership" },
  { id: "vr-rehabilitation", label: "VR Rehabilitation" },
  { id: "decoding", label: "Neural Signal Decoding" },
  { id: "stimulation", label: "Neural Stimulation" },
];

export function topicLabel(id: TopicId): string {
  return TOPICS.find((topic) => topic.id === id)?.label ?? id;
}

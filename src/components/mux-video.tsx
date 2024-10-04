import MuxPlayer from "@mux/mux-player-react";

export default function MuxVideo({ playbackId }: { playbackId?: string }) {
  if (!playbackId) return null;

  return <MuxPlayer playbackId={playbackId} />;
}

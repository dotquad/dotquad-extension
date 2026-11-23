<script setup lang="ts">
import { gradeTone, type Grade } from "@dotquad/net";

/** The A+ to F square on graded checks: teal for A, grey for B and C, amber for D and F. */
const { grade, small = false } = defineProps<{ grade: Grade | null; small?: boolean }>();
</script>

<template>
  <span
    class="grade"
    :class="[grade ? gradeTone(grade) : 'neutral', { small }]"
    :aria-label="grade ? `Grade ${grade}` : 'Not graded'"
  >
    {{ grade ?? "–" }}
  </span>
</template>

<style scoped>
.grade {
  flex: none;
  display: inline-grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  font: 700 28px var(--font-display);
}
.grade.small {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  font-size: 15px;
}
.ok {
  background: var(--signal-tint);
  color: var(--signal-tint-text);
}
.neutral {
  background: var(--muted-bg);
  color: var(--text);
}
.flag {
  background: var(--flag-tint);
  color: var(--flag);
}
</style>

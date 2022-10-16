<template>
  <div
    class="team"
    :class="{
      'team-red': props.teamColor === 'red',
      'team-blue': props.teamColor === 'blue',
    }"
  >
    <div class="master">
      <join-to-placeholder>Стать капитаном</join-to-placeholder>
    </div>
    <div class="players">
      <join-to-placeholder>Стать игроком</join-to-placeholder>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import TeamColor from "@/types/TeamColor";
import JoinToPlaceholder from "@/components/JoinToPlaceholder.vue";

export default defineComponent({
  components: {
    JoinToPlaceholder,
  },
  props: {
    teamColor: {
      required: true,
      type: String as PropType<TeamColor>,
    },
  },
  setup(props) {
    return {
      props,
    };
  },
});
</script>

<style scoped>
.team {
  padding: 8px;
  height: 50vh;
  width: 100%;
  max-width: 150px;
  display: flex;
  flex-direction: column;
}
.master {
  position: relative;
  margin-bottom: 10px;
}
.master::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  background: #fff;
  bottom: -5px;
  left: -3px;
}
.team-red {
  background: rgba(255, 0, 0, 0.4);
  border-left: 2px solid red;
}
.team-blue {
  background: rgba(0, 0, 255, 0.3);
  border-right: 2px solid blue;
}
</style>

<template>
  <div
    class="team"
    :class="{
      'team-red': props.teamColor === 'red',
      'team-blue': props.teamColor === 'blue',
    }"
  >
    <div class="master">
      <div class="master__row">
        <div
          class="player"
          v-for="player in store.PlayersOnThisTeam(
            props.teamColor,
            placeMaster
          )"
          :key="player.id"
        >
          {{ player.nickname }}
        </div>
      </div>
      <join-to-placeholder
        @click="store.SwitchPlace(placeMaster, props.teamColor)"
        :place="placeMaster"
        v-show="
          store.PlayersOnThisTeam(props.teamColor, placeMaster).length === 0
        "
        >Стать капитаном</join-to-placeholder
      >
    </div>
    <div class="members">
      <div class="members__row">
        <div
          class="player"
          v-for="player in store.PlayersOnThisTeam(teamColor, placeMember)"
          :key="player.id"
        >
          {{ player.nickname }}
        </div>
      </div>
      <join-to-placeholder
        :place="placeMember"
        @click="store.SwitchPlace(placeMember, props.teamColor)"
        >Стать игроком</join-to-placeholder
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import TeamColor from "@/types/TeamColor";
import JoinToPlaceholder from "@/components/JoinToPlaceholder.vue";
import { useGameStore } from "@/store/store";

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
    const placeMaster = "master";
    const placeMember = "member";
    const store = useGameStore();
    return { store, props, placeMember, placeMaster };
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
.players__row {
  display: flex;
  flex-direction: column;
}
.player {
  padding: 3px;
}
</style>

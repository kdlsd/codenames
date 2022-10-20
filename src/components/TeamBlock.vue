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
        v-show="!store.HidePlaceholderTojoin(props.teamColor, 'member')"
        @click="store.SwitchPlace(placeMember, props.teamColor)"
        >Стать игроком</join-to-placeholder
      >
    </div>
    <div class="unsolved">
      <span>{{ store.CorrectUnsolvedWords(props.teamColor) }}</span>
    </div>
    <div
      class="timer"
      v-show="store.turn === props.teamColor && store.isGameOn"
    >
      <span>Log</span>
      <span>{{ store.currentTimer }}</span>
    </div>
    <div class="hint">
      <ul class="hint__list">
        <li
          class="hint__item"
          v-for="(hint, index) in store.hints[props.teamColor]"
          :key="index"
        >
          {{ hint }}
        </li>
      </ul>
      <input
        type="text"
        v-model="currentHint"
        v-show="
          store.turn === props.teamColor &&
          store.isMasterGiveHint &&
          store.SearchPlayer?.place === 'master' &&
          store.SearchPlayer?.team === props.teamColor &&
          store.isGameOn
        "
        @keydown.enter="addHint()"
        class="hint__input"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
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
    const currentHint = ref("");
    const placeMaster = "master";
    const placeMember = "member";
    const store = useGameStore();
    function addHint(): void {
      if (currentHint.value !== "") {
        store.AddHint(props.teamColor, currentHint.value);
        currentHint.value = "";
      }
    }
    return { store, props, placeMember, placeMaster, currentHint, addHint };
  },
});
</script>

<style scoped>
.team {
  padding: 8px;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 140px;
  height: 100%;
}
.master {
  border-bottom: 1px solid;
  margin-bottom: 7px;
  padding-bottom: 6px;
}
.team-red {
  border-left: #ff6450 2px solid;
  background: rgba(255, 100, 80, 0.08);
}
.team-blue {
  border-right: #50bbff 2px solid;
  background: rgba(80, 187, 255, 0.1);
}
.members__row {
  display: flex;
  flex-direction: column;
}
.members {
  flex-grow: 1;
}
.team-red .unsolved {
  color: #ff6450;
}
.team-blue .unsolved {
  color: #50bbff;
}
.unsolved {
  position: absolute;
  font-size: 215px;
  font-weight: 700;
  font-family: "Roboto Condensed", sans-serif;
  bottom: 14%;
  opacity: 0.2;
  user-select: none;
  z-index: 0;
  left: 0;
  right: 0;
  text-align: center;
}
.hint {
  margin-bottom: 10px;
}
.hint::before {
  content: "";
  display: block;
  position: relative;
  top: 10px;
  width: 100%;
  height: 1px;
  background: #fff;
}
.hint__list {
  list-style-type: none;
  padding: 0;
}
.hint__input {
  width: 100%;
}
.timer {
  display: flex;
  justify-content: space-between;
}
</style>

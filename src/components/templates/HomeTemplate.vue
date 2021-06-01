<template>
  <main class="content">
    <div id="home">
      <Alert :auth-status="userInfo.get('authStatus')" />
      <!-- <vs-row style="width: auto">
        <vs-col type="flex" vs-w="4">
          <SmallCard2 :lend-number="lendNumber" :borrow-number="borrowNumber" />
        </vs-col>
        <vs-col type="flex" vs-w="4">
          <SmallCard1 :info-title="'今月の売上'" :info-number="salesNumber" />
        </vs-col>
        <vs-col type="flex" vs-w="4">
          <SmallCard1 :info-title="'ダミーダミー'" :info-number="dummyNumber" />
        </vs-col>
      </vs-row>
      <vs-row style="width: auto">
        <vs-col type="flex" vs-w="8">
          <Graph :graph="graphData" />
        </vs-col>
        <vs-col type="flex" vs-w="4">
          <OperationInfo :operation-infos="operationInfos" />
        </vs-col>
      </vs-row> -->
      <ListingButton v-if="userInfo.statusIsApproved()" />
    </div>
  </main>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  SetupContext,
  toRefs,
} from '@vue/composition-api'
import Alert from '~/components/molecules/Alert'
// import Graph from '~/components/organisms/Graph'
// import OperationInfo from '~/components/organisms/OperationInfo'
import ListingButton from '~/components/molecules/ListingButton'
import UserInfo from '~/utilities/UserInfo'
// import SmallCard1 from '~/components/molecules/SmallCard1'
// import SmallCard2 from '~/components/molecules/SmallCard2'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    Alert,
    // Graph,
    // OperationInfo,
    ListingButton,
    // SmallCard1,
    // SmallCard2,
  },
  setup(_props, _context: SetupContext) {
    const state = reactive({
      userInfo: UserInfo,
      alertMessage:
        'レンタル開始に必要な情報が登録されていません。ユーザー基本情報登録、携帯電話認証、身分証認証を行って下さい。',
      lendNumber: 99999,
      borrowNumber: 99999,
      salesNumber: 999,
      dummyNumber: 999,
      graphData:
        'グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。グラフ入る予定です。',
      operationInfos: [
        {
          id: 1,
          date: '2020.02.20',
          content:
            'このテキストはお知らせのダミーです。このテキストはお知らせのダミーです。',
        },
        {
          id: 2,
          date: '2020.02.20',
          content:
            'このテキストはお知らせのダミーです。このテキストはお知らせのダミーです。',
        },
        {
          id: 3,
          date: '2020.02.20',
          content:
            'このテキストはお知らせのダミーです。このテキストはお知らせのダミーです。',
        },
        {
          id: 4,
          date: '2020.02.21',
          content:
            'このテキストはお知らせのダミーです。このテキストはお知らせのダミーです。',
        },
      ],
    })
    return {
      ...toRefs(state),
    }
  },
})
</script>

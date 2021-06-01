<template>
  <vs-sidebar
    v-model="active"
    static-position
    default-index="1"
    color="primary"
    class="sidebarx"
    spacer
  >
    <div class="vs-content-sidebar__home">
      <vs-sidebar-item index="1" to="/">
        <ion-icon
          class="vs-content-sidebar__home-ico"
          name="home-outline"
        ></ion-icon
        >ホーム
      </vs-sidebar-item>
    </div>
    <vs-sidebar-group title="取引">
      <vs-sidebar-item index="2" to="/rent"> 借りる </vs-sidebar-item>
      <vs-sidebar-item index="3" to="/lend"> 貸す </vs-sidebar-item>
      <!--      <vs-sidebar-item index="4" to="/owner_change">-->
      <!--        オーナーチェンジ-->
      <!--      </vs-sidebar-item>-->
    </vs-sidebar-group>
    <div class="vs-content-sidebar__item">
      <vs-sidebar-item index="5" to="/owned_items_list">
        <ion-icon
          class="vs-content-sidebar__item-ico"
          name="gift-outline"
        ></ion-icon
        >所有アイテム一覧
      </vs-sidebar-item>
    </div>
    <!--
      <vs-sidebar-group title="各種設定">
        <vs-sidebar-item index="10" to="/card_management">
          クレジットカード情報登録・編集
        </vs-sidebar-item>
        <vs-sidebar-item index="11" to="/id_verification">
          身分証認証
        </vs-sidebar-item>
        <vs-sidebar-item index="12" to="/vacation_mode">
          休暇モード
        </vs-sidebar-item>
        <vs-sidebar-item index="13" to="/delivery_place_management">
          受け渡し場所の管理
        </vs-sidebar-item>
        <vs-sidebar-item index="14" to="/email_setting">
          メール設定
        </vs-sidebar-item>
      </vs-sidebar-group>
      <vs-sidebar-group title="アカウントメニュー">
        <vs-sidebar-item index="15" to="/user_info">
          ユーザー基本情報
        </vs-sidebar-item>
        <vs-sidebar-item index="16" to="/email_address_change">
          メールアドレス変更
        </vs-sidebar-item>
        <vs-sidebar-item index="17" to="/passward_change">
          パスワード変更
        </vs-sidebar-item>
        <vs-sidebar-item index="18" to="/phone_number_authentication">
          携帯電話番号認証
        </vs-sidebar-item>
      </vs-sidebar-group>
      <vs-sidebar-group title="その他">
        <vs-sidebar-item index="18" to="/contact"> お問い合わせ </vs-sidebar-item>
        <vs-sidebar-item index="19" to="/unsubscribe">
          アプレマルシェ会員の退会
        </vs-sidebar-item>
      </vs-sidebar-group> -->
  </vs-sidebar>
</template>

<script>
export default {
  data() {
    return {
      active: false,
    }
  },
}
</script>

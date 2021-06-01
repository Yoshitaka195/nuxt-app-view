<template>
  <header class="header">
    <transition name="fade">
      <div v-if="isLoading" class="loading-modal">
        <loading-spinner />
      </div>
    </transition>
    <h1 class="header__logo">
      <router-link to="/" class="header__logo-wrap">
        <img
          src="/img/logo.svg"
          class="header__logo-img"
          alt="SUUTA BUSINESS"
        />
      </router-link>
    </h1>
    <div v-if="userInfo.existsData()" class="header__nav">
      <!-- <vs-dropdown vs-custom-content vs-trigger-click class="mr20">
        <ion-icon class="header__ico" name="chatbubbles-outline" />
        <vs-dropdown-menu class="loginx">
          <h3>メッセージ</h3>
          <ul class="message-doropdown">
            <router-link tag="li" to="/message" class="message-doropdown__list">
              <div class="message-doropdown__left-wrap">
                <img
                  class="message-doropdown__img"
                  src="/img/sample/sample-02.jpg"
                />
                <div>
                  <p class="message-doropdown__user">
                    <b>ウラディミール・バレンティン</b>
                  </p>
                  <p class="message-doropdown__comment">
                    バットを借りたいのデス。
                  </p>
                </div>
              </div>
              <p class="message-doropdown__time">2020年02月20日 17:28</p>
            </router-link>
            <router-link tag="li" to="/message" class="message-doropdown__list">
              <div class="message-doropdown__left-wrap">
                <img
                  class="message-doropdown__img"
                  src="/img/sample/sample-02.jpg"
                />
                <div>
                  <p class="message-doropdown__user">
                    <b>ウラディミール・バレンティン</b>
                  </p>
                  <p class="message-doropdown__comment">
                    バットを借りたいのデス。
                  </p>
                </div>
              </div>
              <p class="message-doropdown__time">2020年02月20日 17:28</p>
            </router-link>
            <router-link tag="li" to="/message" class="message-doropdown__list">
              <div class="message-doropdown__left-wrap">
                <img
                  class="message-doropdown__img"
                  src="/img/sample/sample-02.jpg"
                />
                <div>
                  <p class="message-doropdown__user">
                    <b>ウラディミール・バレンティン</b>
                  </p>
                  <p class="message-doropdown__comment">
                    バットを借りたいのデス。
                  </p>
                </div>
              </div>
              <p class="message-doropdown__time">2020年02月20日 17:28</p>
            </router-link>
            <router-link tag="li" to="/message" class="message-doropdown__list">
              <div class="message-doropdown__left-wrap">
                <img
                  class="message-doropdown__img"
                  src="/img/sample/sample-02.jpg"
                />
                <div>
                  <p class="message-doropdown__user">
                    <b>ウラディミール・バレンティン</b>
                  </p>
                  <p class="message-doropdown__comment">
                    バットを借りたいのデス。
                  </p>
                </div>
              </div>
              <p class="message-doropdown__time">2020年02月20日 17:28</p>
            </router-link>
            <router-link tag="li" to="/message" class="message-doropdown__list">
              <div class="message-doropdown__left-wrap">
                <img
                  class="message-doropdown__img"
                  src="/img/sample/sample-02.jpg"
                />
                <div>
                  <p class="message-doropdown__user">
                    <b>ウラディミール・バレンティン</b>
                  </p>
                  <p class="message-doropdown__comment">
                    バットを借りたいのデス。
                  </p>
                </div>
              </div>
              <p class="message-doropdown__time">2020年02月20日 17:28</p>
            </router-link>
            <router-link tag="li" to="/message" class="message-doropdown__list">
              <div class="message-doropdown__left-wrap">
                <img
                  class="message-doropdown__img"
                  src="/img/sample/sample-02.jpg"
                />
                <div>
                  <p class="message-doropdown__user">
                    <b>ウラディミール・バレンティン</b>
                  </p>
                  <p class="message-doropdown__comment">
                    バットを借りたいのデス。
                  </p>
                </div>
              </div>
              <p class="message-doropdown__time">2020年02月20日 17:28</p>
            </router-link>
          </ul>
          <p class="doropdown-footer">
            <router-link to="/notice"> 全て見る </router-link>
          </p>
        </vs-dropdown-menu>
      </vs-dropdown>
      <vs-dropdown vs-custom-content vs-trigger-click>
        <ion-icon class="header__ico" name="notifications-outline" />
        <vs-dropdown-menu class="loginx">
          <h3>通知</h3>
          <ul class="notice-doropdown">
            <router-link tag="li" to="/notice" class="notice-doropdown__list">
              <img
                class="notice-doropdown__img"
                src="/img/sample/sample-01.png"
              />
              <div class="notice-doropdown__text">
                <p>「アイテム名」のレンタル申請が承認されました。</p>
                <p class="notice-doropdown__time">2020年02月20日 17:28</p>
              </div>
            </router-link>
            <router-link tag="li" to="/notice" class="notice-doropdown__list">
              <img
                class="notice-doropdown__img"
                src="/img/sample/sample-01.png"
              />
              <div class="notice-doropdown__text">
                <p>「アイテム名」のレンタル申請が承認されました。</p>
                <p class="notice-doropdown__time">2020年02月20日 17:28</p>
              </div>
            </router-link>
            <router-link tag="li" to="/notice" class="notice-doropdown__list">
              <img
                class="notice-doropdown__img"
                src="/img/sample/sample-01.png"
              />
              <div class="notice-doropdown__text">
                <p>「アイテム名」のレンタル申請が承認されました。</p>
                <p class="notice-doropdown__time">2020年02月20日 17:28</p>
              </div>
            </router-link>
            <router-link tag="li" to="/notice" class="notice-doropdown__list">
              <img
                class="notice-doropdown__img"
                src="/img/sample/sample-01.png"
              />
              <div class="notice-doropdown__text">
                <p>「アイテム名」のレンタル申請が承認されました。</p>
                <p class="notice-doropdown__time">2020年02月20日 17:28</p>
              </div>
            </router-link>
            <router-link tag="li" to="/notice" class="notice-doropdown__list">
              <img
                class="notice-doropdown__img"
                src="/img/sample/sample-01.png"
              />
              <div class="notice-doropdown__text">
                <p>「アイテム名」のレンタル申請が承認されました。</p>
                <p class="notice-doropdown__time">2020年02月20日 17:28</p>
              </div>
            </router-link>
            <router-link tag="li" to="/notice" class="notice-doropdown__list">
              <img
                class="notice-doropdown__img"
                src="/img/sample/sample-01.png"
              />
              <div class="notice-doropdown__text">
                <p>「アイテム名」のレンタル申請が承認されました。</p>
                <p class="notice-doropdown__time">2020年02月20日 17:28</p>
              </div>
            </router-link>
          </ul>
          <p class="doropdown-footer">
            <router-link to="/notice"> 全て見る </router-link>
          </p>
        </vs-dropdown-menu>
      </vs-dropdown> -->

      <p class="header__user-name">{{ userInfo.get('nickname') }}</p>
      <vs-dropdown vs-custom-content>
        <circle-icon :img-src="userInfo.get('imageSource')" />
        <vs-dropdown-menu class="header-dropdown">
          <div class="inner">
            <p class="label">アカウント</p>
            <div class="account">
              <circle-icon :img-src="userInfo.get('imageSource')" />
              <div class="info">
                <p class="name">{{ userInfo.get('nickname') }}</p>
                <p class="type">
                  {{
                    userInfo.get('isPersonal')
                      ? '個人アカウント'
                      : 'ストアアカウント'
                  }}
                </p>
              </div>
              <vs-icon icon="done" color="#5AACF2" />
            </div>
            <div
              v-for="account in userInfo.get('otherAccounts')"
              :key="account.id"
              class="account other"
              @click="switchAccount(account.id)"
            >
              <circle-icon :img-src="account.imageSource" />
              <div class="info">
                <p class="name">{{ account.nickname }}</p>
                <p class="type">
                  {{
                    account.isPersonal ? '個人アカウント' : 'ストアアカウント'
                  }}
                </p>
              </div>
            </div>
            <p class="sign-out-button" @click="signOut">ログアウト</p>
          </div>
        </vs-dropdown-menu>
      </vs-dropdown>
    </div>
  </header>
</template>

<script lang="ts">
import Cookies from 'universal-cookie'
import {
  defineComponent,
  reactive,
  SetupContext,
  toRefs,
} from '@vue/composition-api'
import { auth } from 'firebase'
import ApiRequestParams from '~/utilities/ApiRequestParams'
import UserInfo from '~/utilities/UserInfo'
import CircleIcon from '~/components/atoms/CircleIcon'
import { UserRepository } from '~/repositories/UserRepository'
import LoadingSpinner from '~/components/atoms/LoadingSpinner'

export default defineComponent({
  components: {
    CircleIcon,
    LoadingSpinner,
  },
  setup(_props, context: SetupContext) {
    const state = reactive({
      userInfo: UserInfo,
      isLoading: false,
    })

    const signOut = async () => {
      const userRepo = new UserRepository()
      userRepo.deleteAccountInfoFromCookie()
      state.userInfo.deleteAll()
      await auth().signOut()
      context.root.$router.push('/signin')
    }

    const cookies = new Cookies()
    const userRepo = new UserRepository()
    const switchAccount = async (id: number): Promise<void> => {
      state.isLoading = true
      const userToken = await userRepo.getUserToken({
        user_token: ApiRequestParams.USER_TOKEN(),
        id,
        user_group_id: ApiRequestParams.USER_GROUP_ID(),
      })

      cookies.set('uid', userToken, { maxAge: 60 * 60 * 24 })
      cookies.set('groupId', ApiRequestParams.USER_GROUP_ID(), {
        maxAge: 60 * 60 * 24,
      })

      const groupId = cookies.get('groupId')

      const entity = await userRepo.getExhibitor({
        user_token: userToken,
        user_group_id: +groupId,
      })
      state.userInfo.setFrom(entity)
      context.root.$router.push('/')
      state.isLoading = false
    }

    return {
      ...toRefs(state),
      signOut,
      switchAccount,
    }
  },
})
</script>

<style lang="scss">
@import '~/assets/style/app.scss';

.header-dropdown {
  .inner {
    width: 35rem;
    padding: 1rem;

    > .label {
      font-size: 1.6rem;
      font-weight: bold;
      padding-bottom: 1rem;
      border-bottom: 0.1rem solid #f0f0f0;
    }

    > .account {
      display: flex;
      padding: 1rem 0;
      border-bottom: 0.1rem solid #f0f0f0;
      align-items: center;
      transition: color 0.2s 0s ease;

      > .info {
        margin: 0 auto 0 1rem;
        > .name {
          font-weight: bold;
        }
      }
      &.other:hover {
        color: $sub-color;
        cursor: pointer;
      }
    }

    > .sign-out-button {
      padding-top: 1rem;
      text-align: center;
      cursor: pointer;
      transition: color 0.2s 0s ease;

      &:hover {
        color: $sub-color;
      }
    }
  }
}
</style>

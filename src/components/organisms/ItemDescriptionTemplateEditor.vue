<template>
  <div class="item-description-template-editor">
    <transition name="fade" mode="out-in">
      <div
        v-if="isLoadingTemplates"
        key="loading-template"
        class="loading-wrapper"
      >
        <loading-spinner sub-color />
      </div>
      <div v-else key="button-list" class="button-list">
        <ion-icon
          name="add-circle-outline"
          class="add-button"
          @click="showEmptyTemplate"
        />
        <general-button
          v-for="template in templates"
          :key="template.id"
          :text="template.title"
          @click="showExistingTemplate(template.id)"
        />
      </div>
    </transition>

    <!-- テンプレート編集用のポップアップ -->
    <vs-popup :title="modalTitle" :active.sync="modalVisible">
      <div class="item-description-form">
        <transition name="fade" mode="out-in">
          <div
            v-if="isLoadingModalContents"
            key="loading-modal"
            class="loading-wrapper"
          >
            <loading-spinner />
          </div>
          <div v-else :key="currentTemplate.id" class="modal-contents">
            <template v-if="modalVisible">
              <div class="form-wrap mb30">
                <form-text-input
                  v-model="title"
                  :max-length="25"
                  :place-holder="'テンプレート名（必須 25文字以内）'"
                />
              </div>
              <div class="form-wrap mb30">
                <form-text-area
                  v-model="description"
                  :max-length="300"
                  :rows="8"
                  :place-holder="'商品説明（任意 300文字以内）'"
                />
              </div>
              <div class="button-wrap">
                <vs-button
                  v-if="creatingNewTemplate"
                  color="primary"
                  type="filled"
                  class="btn"
                  @click.native="createTemplate"
                >
                  登録
                </vs-button>
                <vs-button
                  v-else
                  :color="changed ? 'success' : 'primary'"
                  type="filled"
                  class="btn"
                  @click.native="changed ? updateTemplate() : insertTemplate()"
                >
                  {{ changed ? '更新' : '説明に引用' }}
                </vs-button>
                <vs-button
                  v-if="!creatingNewTemplate"
                  color="dark"
                  type="filled"
                  class="btn"
                  @click.native="deleteTemplate"
                >
                  削除
                </vs-button>
              </div>
            </template>
          </div>
        </transition>
      </div>
    </vs-popup>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  SetupContext,
  toRefs,
} from '@vue/composition-api'
import ApiRequestParams from '~/utilities/ApiRequestParams'
import LoadingSpinner from '~/components/atoms/LoadingSpinner'
import GeneralButton from '~/components/atoms/GeneralButton'
import FormTextInput from '~/components/atoms/FormTextInput'
import FormTextArea from '~/components/atoms/FormTextArea'
import { UserDefinitionRepository } from '~/repositories/UserDefinitionRepository'
import { TemplateOverviewEntity } from '~/entities/ItemDescriptionTemplatesEntity'
import { ItemDescriptionTemplateEntity } from '~/entities/ItemDescriptionTemplateEntity'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    LoadingSpinner,
    GeneralButton,
    FormTextInput,
    FormTextArea,
  },
  setup(_props, context: SetupContext) {
    const EMPTY_ID = -1
    const state = reactive({
      isLoadingTemplates: true,
      isLoadingModalContents: true,
      modalVisible: false,
      templates: {} as TemplateOverviewEntity[],
      currentTemplate: {
        id: EMPTY_ID,
        title: '',
        description: '',
      } as ItemDescriptionTemplateEntity,
      title: '',
      description: '',
    })

    const modalTitle = computed((): string => {
      if (state.isLoadingModalContents) return '読込中...'
      return state.currentTemplate.id === EMPTY_ID
        ? 'テンプレート作成'
        : state.currentTemplate.title
    })

    const creatingNewTemplate = computed(
      (): boolean => state.currentTemplate.id === EMPTY_ID && state.modalVisible
    )
    const changed = computed(
      (): boolean =>
        state.title !== state.currentTemplate.title ||
        state.description !== state.currentTemplate.description
    )

    const repo = new UserDefinitionRepository()
    const getTemplates = async () => {
      state.isLoadingTemplates = true
      const templatesEntity = await repo.getItemDescriptionTemplates({
        user_token: ApiRequestParams.USER_TOKEN(),
      })
      state.templates = templatesEntity.templates
      state.isLoadingTemplates = false
    }

    const showEmptyTemplate = () => {
      state.currentTemplate.id = EMPTY_ID
      state.title = ''
      state.description = ''
      state.isLoadingModalContents = false
      state.modalVisible = true
    }

    const showExistingTemplate = (id: number) => {
      getTemplate(id)
      state.modalVisible = true
    }
    const getTemplate = async (id: number) => {
      state.isLoadingModalContents = true
      const template = await repo.getItemDescriptionTemplate({
        user_token: ApiRequestParams.USER_TOKEN(),
        id,
      })
      state.currentTemplate = template
      state.title = template.title
      state.description = template.description
      state.isLoadingModalContents = false
    }

    const createTemplate = async () => {
      if (!state.title) {
        alert('テンプレート名を入力してください。')
        return
      }
      state.isLoadingModalContents = true
      await repo.createItemDescriptionTemplate({
        user_token: ApiRequestParams.USER_TOKEN(),
        title: state.title,
        description: state.description,
      })
      state.modalVisible = false
      await getTemplates()
    }

    const updateTemplate = async () => {
      if (!state.title) {
        alert('テンプレート名を入力してください。')
        return
      }
      state.isLoadingModalContents = true
      await repo.updateItemDescriptionTemplate({
        user_token: ApiRequestParams.USER_TOKEN(),
        user_template_id: state.currentTemplate.id,
        title: state.title,
        description: state.description,
      })
      await Promise.all([getTemplates(), getTemplate(state.currentTemplate.id)])
    }

    const deleteTemplate = async () => {
      if (
        !confirm(
          `${state.currentTemplate.title}のテンプレートを削除します。\nよろしいですか？`
        )
      )
        return

      state.isLoadingModalContents = true
      await repo.deleteItemDescriptionTemplate({
        user_token: ApiRequestParams.USER_TOKEN(),
        user_template_id: state.currentTemplate.id,
      })
      state.modalVisible = false
      await getTemplates()
    }
    const insertTemplate = () => {
      context.emit('insert', `\n${state.description}`)
      state.modalVisible = false
    }
    onMounted(async () => {
      await getTemplates()
    })
    return {
      ...toRefs(state),
      modalTitle,
      creatingNewTemplate,
      changed,
      getTemplates,
      showEmptyTemplate,
      showExistingTemplate,
      createTemplate,
      updateTemplate,
      deleteTemplate,
      insertTemplate,
    }
  },
})
</script>

<style lang="scss">
@import '~/assets/style/app.scss';

.item-description-template-editor {
  width: 100%;
  padding-bottom: 0.5rem;

  .loading-wrapper {
    padding-bottom: 0.5rem;
    display: flex;
    justify-content: center;
  }

  .button-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .add-button {
      color: $sub-color;
      margin-right: 0.5rem;
      font-size: 3rem;
      cursor: pointer;
    }
    .general-button {
      margin: 0.5rem;
    }
  }
}

.item-description-form {
  height: 400px;
  .loading-wrapper {
    height: 100%;
    padding-bottom: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .form-wrap {
    border-bottom: 0.1rem solid #f0f0f0;
    padding-bottom: 3rem;
  }
  .button-wrap {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;

    .btn {
      width: 14rem;
    }
  }
}
</style>

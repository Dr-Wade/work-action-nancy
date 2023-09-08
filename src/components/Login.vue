<template>
    <BccModal title="Login" v-bind="{ open, closeButton: false }">
        <BccInput
            v-model="password"
            label="Service account password"
            :state="error ? 'error' : undefined"
        >
            <template v-if="error">Wrong password</template>
        </BccInput>
        <template #primaryAction>
            <BccButton @click="login">Login</BccButton>
        </template>
    </BccModal>
</template>
<script setup lang="ts">
import { useServiceAccount } from '@/composables/serviceAccount'
import { BccModal, BccButton, BccInput } from '@bcc-code/design-library-vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ref, watch } from 'vue'

defineProps<{ open: boolean }>()
const password = ref<string>('')
const error = ref<boolean>(false)
const { serviceAccountEmail } = useServiceAccount()
const login = () => {
    signInWithEmailAndPassword(getAuth(), serviceAccountEmail, password.value)
        .catch((err) => {
            console.log(err)
            error.value = true
        })
}

watch(password, () => error.value = false)
</script>
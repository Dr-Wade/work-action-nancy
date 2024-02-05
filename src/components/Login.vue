<template>
    <BccModal title="Login" v-bind="{ open, closeButton: false }">
        <div class="flex flex-col gap-y-2">
            <BccSelect v-model="email" label="Role">
                <option value="teamLeader">Chef d'équipe</option>
                <option value="admin">Admin</option>
            </BccSelect>
            <BccInput
                v-model="password"
                label="Mot de passe"
                :state="error ? 'error' : undefined"
            >
                <template v-if="error">Wrong password</template>
            </BccInput>
        </div>
        <template #primaryAction>
            <BccButton @click="login">Login</BccButton>
        </template>
    </BccModal>
</template>
<script setup lang="ts">
import { useServiceAccount } from '@/composables/useServiceAccount'
import { BccModal, BccSelect, BccButton, BccInput } from '@bcc-code/design-library-vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ref, watch } from 'vue'

defineProps<{ open: boolean }>()
const email = ref<string>('teamLeader')
const password = ref<string>('')
const error = ref<boolean>(false)
const { serviceAccountEmail, teamLeaderEmail } = useServiceAccount()
const login = () => {
    signInWithEmailAndPassword(getAuth(), email.value == 'teamLeader' ? teamLeaderEmail : serviceAccountEmail, password.value)
        .catch((err) => {
            console.log(err)
            error.value = true
        })
}

watch(password, () => error.value = false)
</script>
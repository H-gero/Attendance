<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useAuthStore2 } from 'src/stores/auth-store'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const authStore = useAuthStore2()
const router = useRouter()

const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)

onMounted(() => {
  authStore.cargarPerfil()
  if (authStore.user) {
    redirigirSegunRol()
  }
})

const emailRules = [
  (val) => !!val || 'El usuario o correo es requerido',
  (val) => /.+@.+\..+/.test(val) || 'El correo debe ser válido',
]
const passwordRules = [(val) => !!val || 'La contraseña es requerida']

async function handleLogin() {
  if (!username.value || !password.value) {
    $q.notify({ color: 'negative', message: 'Completa todos los campos', icon: 'warning' })
    return
  }

  isLoading.value = true
  try {
    if (username.value === 'admin@gmail.com' && password.value === 'admin') {
      localStorage.setItem('authData', JSON.stringify({ username: username.value }))
      router.push('/')
      $q.notify({
        color: 'positive',
        message: `Bienvenido/a, ${username.value}!`,
        icon: 'check',
      })

    } else {
      $q.notify({ color: 'negative', message: 'Usuario o contraseña incorrectos', icon: 'warning' })
    }
    // await authStore.login(username.value, password.value)
    // $q.notify({
    //   color: 'positive',
    //   message: `Bienvenido/a, ${username.value}!`,
    //   icon: 'check',
    // })
    // redirigirSegunRol()
  } catch (error) {
    $q.notify({ color: 'negative', message: error.message, icon: 'warning' })
  } finally {
    isLoading.value = false
  }
}

function redirigirSegunRol() {
  const rol = authStore.getRol()
  if (rol === 'jefe_de_año') router.push('/admin')
  else if (rol === 'profesor') router.push('/pasesdeasistencia')
  else if (rol === 'estudiante') router.push('/qr-asistencia')
  else router.push('/')
}

function forgotPassword() {
  $q.notify({ color: 'info', message: 'Funcionalidad no implementada aún', icon: 'info' })
}
</script>

<template>
  <div class="login-container q-pa-md">
    <div class="header text-center q-mb-md">
      <h1 class="text-h4 text-grey-9">Attendance UCI</h1>
      <p class="text-caption text-grey-7">Sistema de Asistencia - UCI</p>
    </div>
    <div class="logo-container q-mb-md text-center">
      <q-icon name="school" size="5em" color="blue-grey-7" />
    </div>
    <q-card flat bordered class="q-pa-md login-card">
      <q-form @submit.prevent="handleLogin" class="q-gutter-md">
        <q-input v-model="username" label="Usuario o Correo" outlined :rules="emailRules" aria-required="true" />
        <q-input v-model="password" label="Contraseña" type="password" outlined :rules="passwordRules"
          aria-required="true" />
        <div class="row items-center q-mb-md">
          <q-checkbox v-model="rememberMe" label="Recuérdame" color="primary" />
          <q-space />
          <a href="#" @click.prevent="forgotPassword" class="text-caption text-primary">¿Olvidó su contraseña?</a>
        </div>
        <q-btn unelevated color="primary" label="Ingresar" type="submit" :loading="isLoading" icon="lock"
          class="full-width" />
      </q-form>
    </q-card>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: url('https://upload.wikimedia.org/wikipedia/commons/5/5f/Universidad_de_las_Ciencias_Inform%C3%A1ticas_%28Cuba%29_-_1.jpg') no-repeat center center fixed;
  background-size: cover;
  padding: 20px;
}

.login-card {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 24px;
  background-color: rgba(255, 255, 255, 0.9);
  /* Fondo semitransparente */
  max-width: 300px;
  /* Reducido para que sea más cuadrado */
  margin: 0 auto;
}

.header h1 {
  font-weight: 500;
  margin-bottom: 0;
}

.full-width {
  width: 100%;
}

.logo-container {
  margin-bottom: 24px;
}
</style>

<!-- <script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)

const emailRules = [
  (val) => !!val || 'El usuario o correo es requerido',
  (val) => /.+@.+\..+/.test(val) || 'El correo debe ser válido (ejemplo: usuario@dominio.com)',
]
const passwordRules = [(val) => !!val || 'La contraseña es requerida']

async function handleLogin() {
  if (!email.value || !password.value) {
    $q.notify({
      color: 'negative',
      message: 'Por favor, completa todos los campos.',
      icon: 'warning',
    })
    return
  }

  isLoading.value = true
  try {
    if (!authStore.login) {
      throw new Error('La función de login no está implementada en el store.')
    }
    await authStore.login(email.value, password.value, rememberMe.value)
    $q.notify({
      color: 'positive',
      message: `Bienvenido/a, ${authStore.user?.name || 'Usuario'}!`,
      icon: 'check',
    })


    const role = authStore.user?.role
    if (role === 'profesor') {
      router.push('/pasesdeasistencia')
    } else if (role === 'estudiante') {
      router.push('/qr-asistencia')
    } else if (role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/')
    }
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: error.message || 'Error al iniciar sesión. Verifica tus credenciales.',
      icon: 'warning',
    })
  } finally {
    isLoading.value = false
  }
}

function forgotPassword() {
  $q.notify({
    color: 'info',
    message: 'Funcionalidad de recuperación de contraseña no implementada aún.',
    icon: 'info',
  })

}
</script>

<template>
  <div class="login-container q-pa-md">

    <div class="header text-center q-mb-md">
      <h1 class="text-h4 text-grey-9">Attendance UCI</h1>
      <p class="text-caption text-grey-7">Sistema de Asistencia - UCI</p>
    </div>

    <div class="logo-container q-mb-md text-center">
      <q-icon name="school" size="5em" color="blue-grey-7" />
    </div>


    <q-card flat bordered class="q-pa-md login-card">
      <q-form @submit.prevent="handleLogin" class="q-gutter-md">
        <q-input
          v-model="email"
          label="Usuario o Correo"
          outlined
          :rules="emailRules"
          aria-label="Usuario o correo electrónico"
          aria-required="true"
        />
        <q-input
          v-model="password"
          label="Contraseña"
          type="password"
          outlined
          :rules="passwordRules"
          aria-label="Contraseña"
          aria-required="true"
        />
        <div class="row items-center q-mb-md">
          <q-checkbox v-model="rememberMe" label="Recuérdame" color="primary" />
          <q-space />
          <a href="#" class="text-caption text-primary cursor-pointer" @click.prevent="forgotPassword">
            ¿Olvidó su contraseña?
          </a>
        </div>
        <q-btn
          unelevated
          color="primary"
          label="Ingresar"
          type="submit"
          :loading="isLoading"
          icon="lock"
          class="full-width"
          aria-label="Iniciar sesión en la aplicación"
        />
      </q-form>
    </q-card>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(to bottom, #f0f4f8, #ffffff);
  padding: 20px;
}

.header h1 {
  font-weight: 500;
  margin-bottom: 0;
}

.login-card {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 24px;
}

.full-width {
  width: 100%;
}

.logo-container {
  margin-bottom: 24px;
}
</style> -->

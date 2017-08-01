<template>
  <div class="page-not-found" align="center">
    <div class="container" align="center">
      <h1>{{ $t('pagenotfound.notfound') }}</h1>
      <h5>{{ $t('pagenotfound.sorry') }}</h5>
      <b-button :to="{ name: 'Dashboard' }">{{ $t('pagenotfound.return') }}</b-button>
    </div>
  </div>
</template>

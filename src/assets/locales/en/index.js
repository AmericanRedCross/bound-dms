export default{
  common: {
    system: 'DMS',
    areYouSure: 'Are you sure?',
    noRevert: 'You won\'t be able to revert this!',
    deleteIt: 'Yes, delete it',
    cancel: 'Cancel',
    deleted: 'Deleted!',
    gravatar: 'User profile image provided through gravatar',
    rename: 'Rename',
    delete: 'Delete',
    info: 'Info',
    create: 'Create',
    created: 'Created',
    updated: 'Updated',
    oops: 'Oops',
    edit: 'Edit',
    all: 'All',
    noPermission: 'Looks like you don\'t have permission to do that',
    error: 'Something went wrong',
    upload: 'Upload',
    back: 'Back',
    goBack: 'Continue',
    changesMade: 'You\'ve made changes without saving',
    save: 'Save',
    view: 'View',
    loading: 'Loading',
    filter: 'Filter',
    submit: 'Submit',
    reset: 'Reset',
    pleaseSelect: 'Please select an option',
    validations: {
      required: 'Field is required',
      email: 'Incorrect email format',
      sameAsNewPassword: 'Field must match new password'
    },
    saved: 'Saved',
    add: 'Add',
    true: 'True',
    false: 'False',
    void: 'Not set',
    tableFields: {
      id: 'ID',
      createdAt: 'Created At',
      createdBy: 'Created By',
      actions: 'Actions'
    }
  },
  http: {
    generic: 'Something unexpected happened'
  },
  navbar: {
    language: 'Language',
    user: 'User',
    projects: 'Projects',
    users: 'Users',
    profile: 'Profile',
    signout: 'Sign out',
    settings: 'Settings'
  },
  sidebar: {
    dashboard: 'Dashboard',
    directories: 'Directories',
    documents: 'Documents',
    files: 'Files',
    publish: 'Publish',
    settings: 'Settings',
    translations: 'Translations'
  },
  hello: {
    test1: 'Welcome to your Vue.js app'
  },
  login: {
    email: 'Email address:',
    password: 'Password:',
    login: 'Login',
    forgot: 'Forgotten password',
    reset: 'Send reset link',
    resetSent: 'Password reset link sent to ',
    errors: {
      title: 'Error logging in',
      unauth: 'Password or email does not match'
    }
  },
  reset: {
    accountActivation: 'Account activation',
    passwordReset: 'Password reset',
    enterEmail: 'Enter email address',
    newPass: 'Enter a new password',
    reenter: 'Re-enter the password',
    noMatch: 'Passwords do not match',
    resetSuccess: 'Your password has been reset',
    activateSuccess: 'Your account has been activated'
  },
  dashboard: {
    header: 'Dashboard placeholder',
    chart1: 'Test chart 1',
    chart2: 'Test chart 2',
    chart3: 'Test chart 3',
    randomize: 'Randomize'
  },
  users: {
    header: 'User management',
    list: 'List of users',
    couldNotFind: 'Could not find the requested user',
    newSaved: 'New user saved',
    currentSaved: 'User updated',
    edit: {
      newHeader: 'New user',
      editHeader: 'Edit details',
      user: 'User:',
      firstName: 'First name',
      lastName: 'Surname',
      email: 'Email',
      role: 'Please select a role:',
      admin: 'Administrator',
      translate: 'Translator',
      content: 'Content creator',
      save: 'Save',
      changePass: 'Change password',
      currentPass: 'Current password',
      newPass: 'New password',
      confirmPass: 'Confirm new password'
    },
    listview: {
      type: 'Type to search',
      edit: 'Edit',
      delete: 'Delete'
    }
  },
  history: {
    changes: 'Changes',
    fields: {
      actions: 'Actions',
      date: 'Date',
      by: 'By'
    },
    actions: {
      created: 'Created a {entity}',
      updated: 'Updated a {entity}',
      deleted: 'Deleted a {entity}'
    },
    entities: {
      apikey: 'Api Key',
      directory: 'Directory',
      directoryTranslation: 'Directory Translation',
      document: 'Document',
      documentTranslation: 'Document Translation',
      file: 'File',
      language: 'Language',
      metatype: 'Metatype',
      project: 'Project',
      publish: 'Publish',
      user: 'User'
    }
  },
  projects: {
    header: 'Projects',
    edit: {
      new: 'Create new project',
      newHeader: 'New project'
    },
    modules: {
      module: 'Directory',
      addDirectory: 'Add directory',
      addDocument: 'Documents',
      addTopDirectory: 'Add top level directory',
      addSubDirectory: 'Add subdirectory',
      openMetadataModal: 'Edit metadata',
      saveStructure: 'Save the structure to use this',
      selectDoc: 'Select document',
      noDocs: 'No documents here',
      selectFile: 'Select file',
      titlePlaceholder: 'Enter a title'
    },
    settings: {
      header: 'Project settings',
      base: 'Change base language',
      name: 'Change project name',
      warning: 'Warning: Only change the base language if 100% of content is translated to this language - otherwise content will be lost.',
      projectName: 'Project name:',
      projectDescription: 'Project description:',
      baseLanguage: 'Base language:',
      save: 'Save'
    },
    files: {
      add: 'Add',
      files: 'Files',
      create: 'Create new file',
      createSub: 'Create a file in markdown format',
      upload: 'Upload a file',
      uploadSub: 'Upload an existing doc or .pdf from your computer',
      fields: {
        title: 'Title',
        description: 'Description',
        thumbnail: 'Thumbnail',
        filename: 'Filename',
        code: 'Country Code'
      }
    },
    languages: {
      add: 'Add new translation',
      select: 'Select a language',
      noLangs: 'This project does not have any languages yet, add one to get started'
    },
    dashboard: {
      modules: 'MODULES',
      directories: 'DIRECTORIES',
      subDirectories: 'DIRECTORIES',
      tools: 'TOOLS',
      edit: 'Edit content',
      languages: 'Translations',
      content: 'Content & translations',
      setcontent: 'Content set',
      translations: 'Translations',
      createdby: 'Created by: ',
      publish: 'Last publish',
      lastPublish: 'Last publish at: ',
      publisher: 'By: ',
      viewPublish: 'View publishing details',
      changes: ' Unpublished changes',
      publishing: 'Publishing'
    },
    projectcard: {
      languages: 'Languages: en, es, fr',
      published: 'Published: 20/4/17 12:34',
      updated: 'Updated 10 minutes ago',
      view: 'View'
    },
    detail: {
      edit: 'Edit',
      delete: 'Delete',
      newLang: 'Adding a new language will update translation statistics for this project',
      languages: 'Languages',
      description: 'A description here'
    },
    profile: {
      admin: 'Admin',
      email: 'Email',
      created: 'Account created',
      updated: 'Last updated',
      edituser: 'Edit user',
      changepassword: 'Change password',
      status: 'Status'
    },
    new: {
      name: 'Project name',
      description: 'Description',
      selectBaseLanguage: 'Select a base language',
      details: 'Enter the details of your new document project. You can assign additional languages later on.'
    },
    publish: {
      publishes: 'Publishes',
      history: 'Publish history',
      title: 'Publish content',
      structure: 'Structure changes',
      content: 'Content changes',
      base: 'Base language: ',
      translate: 'Translated languages: ',
      publish: ' Publish these changes',
      publishAll: 'Publish all changes',
      emptystate: 'This project has not been published yet',
      fields: {
        title: 'Title',
        type: 'Type',
        language: 'Language',
        download: 'Download'
      }
    },
    keys: {
      view: 'View Key',
      add: 'Add API Key',
      name: 'Key Name',
      key: 'API Key',
      example: 'e.g. iOS App',
      emptystate: 'There are no Api Keys assigned to this project'
    },
    meta: {
      metatype: {
        emptystate: 'There is no metadata assigned to this project',
        add: 'Add metadata type',
        name: 'Name',
        label: 'Metatype',
        example: 'e.g. colour',
        types: {
          string: 'Text (String)',
          boolean: 'True / False (Boolean)',
          integer: 'Number (Integer)'
        }
      }
    },
    documents: {
      title: 'Documents',
      upload: 'Document upload',
      create: 'Create document',
      edit: {
        titlePlaceholder: 'Document title',
        titleNeeded: 'Don\'t forget to add a title',
        pickImage: 'Select image',
        overwrite: 'This will overwrite the current document.',
        importingDocument: 'Importing document',
        loadingDocument: 'Loading Document'
      },
      fields: {
        title: 'Title',
        translations: 'Translations'
      }
    }
  },
  files: {
    title: 'Files',
    upload: 'File upload',
    emptystate: 'No files have been uploaded yet',
    listview: {
      type: 'Type to search',
      title: 'Files',
      upload: 'File upload',
      create: 'Create a new file',
      edit: {
        titlePlaceholder: 'Document title',
        titleNeeded: 'Don\'t forget to add a title',
        attachImage: 'Attach image',
        pickImage: 'Pick Image'
      }
    }
  },
  pagenotfound: {
    notFound: 'Page not found',
    notAuth: 'Unauthorised access',
    sorry: 'Sorry, the page you are looking for does not exist',
    sorryAuth: 'Sorry, you do not have permission to access the page you are looking for',
    return: 'Return to projects'
  },
  translationWorkflow: {
    filters: {
      allContent: 'All content',
      needsTranslation: 'Needs translation',
      needsRevision: 'Needs revision'
    },
    translations: {
      directoryTitle: ' Directory title',
      directoryContent: ' Directory content',
      noTitle: 'No title set',
      noContent: 'No content set',
      titlePlaceholder: 'Translated directory title',
      originalDocument: 'Original document',
      loadDirectories: 'Load sub directories',
      closeDirectories: 'Close sub directories'
    },
    baseLanguage: 'Base language',
    translationLanguage: 'Translation language',
    previewMarkdown: 'Preview markdown',
    percentTranslated: '% of content translated',
    selectedLanguage: 'Select language',
    allLanguages: 'All languages'
  },
  mediaPicker: {
    urlDesc: 'Input a URL for the ',
    image: 'image',
    file: 'file',
    fileAltPlaceholder: 'Alternative text',
    fileUrlPlaceholder: 'Paste url here',
    selectFile: 'Select a file',
    selectImage: 'Select an image',
    uploadImage: 'Upload an image',
    uploadFile: 'Upload a file',
    inputUrl: 'Paste url',
    inputAlt: 'Input alternative text',
    imagePreview: 'Image preview',
    filePreview: 'File details',
    select: 'Select',
    upload: 'Upload',
    url: 'Url',
    loading: 'Loading',
    title: 'Title:',
    description: 'Description:',
    date: 'Last updated:',
    createdBy: 'Created by:'
  },
  dropzone: {
    douments: {
      dictDefaultMessage: 'Drop documents here',
      dictFallbackMessage: 'Your browser does not support drag\'n\'drop document uploads.',
      dictFallbackText: 'Please use the fallback form below to upload your documents like in the olden days.',
      dictFileTooBig: 'Document is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.',
      dictInvalidFileType: 'You can\'t upload files of this type.',
      dictResponseError: 'Server responded with {{statusCode}} code.',
      dictCancelUpload: 'Cancel upload',
      dictCancelUploadConfirmation: 'Are you sure you want to cancel this upload?',
      dictRemoveFile: 'Remove file',
      dictMaxFilesExceeded: 'You can not upload any more documents.'
    },
    files: {
      dictDefaultMessage: 'Drop files here',
      dictFallbackMessage: 'Your browser does not support drag\'n\'drop file uploads.',
      dictFallbackText: 'Please use the fallback form below to upload your files like in the olden days.',
      dictFileTooBig: 'File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.',
      dictInvalidFileType: 'You can\'t upload files of this type.',
      dictResponseError: 'Server responded with {{statusCode}} code.',
      dictCancelUpload: 'Cancel upload',
      dictCancelUploadConfirmation: 'Are you sure you want to cancel this upload?',
      dictRemoveFile: 'Remove file',
      dictMaxFilesExceeded: 'You can not upload any more files.'
    },
    dictFileSizeUnits: {tb: 'TB', gb: 'GB', mb: 'MB', kb: 'KB', b: 'b'}
  }
}

<template>
  <div class="userTableContainer mt-8 flow-root">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                v-for="heading in headings"
                :key="heading"
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >{{ heading }}</th>
              <th
                scope="col"
                class="relative py-3.5 px-3"
              >
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr
              v-for="person in people"
              :key="person.email"
            >
              <td class="whitespace-nowrap py-5 px-3 text-sm rounded-sm">
                <div class="flex items-center">
                  <div class="size-11 shrink-0">
                    <img
                      class="size-11 rounded-full"
                      :src="person.image"
                      alt=""
                    />
                  </div>
                  <div class="ml-4">
                    <div class="font-medium text-gray-900">{{ person.name }}</div>
                    <div class="mt-1 text-gray-500">{{ person.email }}</div>
                  </div>
                </div>
              </td>
              <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                <div class="text-gray-900">{{ person.title }}</div>
                <div class="mt-1 text-gray-500">{{ person.department }}</div>
              </td>
              <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                <span
                  class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                >Active</span>
              </td>
              <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{{ person.role }}</td>
              <td class="relative whitespace-nowrap py-5 px-3 text-right text-sm font-medium">
                <a
                  href="#"
                  class="text-indigo-600 hover:text-indigo-900"
                >Edit<span class="sr-only">, {{ person.name }}</span></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const headings = ['Name', 'Title', 'Status', 'Role']
const people = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    department: 'Optimization',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
]
</script>
<script lang="ts">
	import { enhance } from '$lib/actions/form';
	export let todo: Todo;

	export let processDeletedTodoResult: (res: Response) => void;
	export let processUpdatedTodoResult: (res: Response) => void;
</script>

<style>
	.save {
		position: absolute;
		right: 0;
		opacity: 0;
	}
	.todo input:focus + .save,
	.save:focus {
		transition: opacity 0.2s;
		opacity: 1;
	}
    .done {
		transform: none;
		opacity: 0.4;
		filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.1));
	}
</style>


<div class="p-2 sm:w-1/2 w-full todo" class:done={todo.done}>
	<div class="bg-gray-800 rounded flex p-4 h-full items-center">
		<form action="/todos/{todo.uid}.json?_method=patch" method="post" use:enhance={{result: processUpdatedTodoResult}}>
			<input type="hidden" name="done" value="{todo.done ? '' : 'true'}"/>
			<button class="toggle">
				<svg
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="3"
			class="text-blue-400 w-6 h-6 flex-shrink-0 mr-4"
			viewBox="0 0 24 24"
		>
		<path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
		{#if todo.done}
			<path d="M22 4L12 14.01l-3-3" />
			{:else}
			<path d="M 22 11.08 V 12 a 10 10 0 1 1 0 -1" />
		{/if}
		</svg>
			</button>
		</form>
		<form action="/todos/{todo.uid}.json?_method=patch" method="post" use:enhance={{result: processUpdatedTodoResult}} class="relative flex items-center w-11/12">
			<input type="text" value="{todo.text}" name="text" class="w-full bg-gray-800 rounded focus:border-blue-500 focus:ring-2 peer
			focus:ring-blue-900 text-base outline-none text-gray-100
			py-1 px-3 leading-8 transition-colors duration-200 ease-in-out title-font font-medium text-white" />
			<button class="absolute right-0 bg-gray-800 rounded focus:border-blue-500 focus:ring-2 mr-3
			focus:ring-blue-900 text-base outline-none text-gray-100
			leading-8 transition-colors duration-200 ease-in-out title-font font-medium text-white save">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
				  </svg>
			</button>
		</form>
		<form action="/todos/{todo.uid}.json?_method=delete" method="post" use:enhance={{result: processDeletedTodoResult}}>
			<button class="bg-gray-800 rounded focus:border-blue-500 focus:ring-2 opacity-20 focus:opacity-80 hover:opacity-80 p-2
			focus:ring-blue-900 text-base outline-none text-gray-100
			leading-8 transition-colors duration-200 ease-in-out title-font font-medium text-white">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
				</svg>
			</button>
		</form>
	</div>
</div>
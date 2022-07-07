<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { enhance } from '$lib/actions/form';

	export const load: Load = async ({ fetch }) => {
		const response = await fetch('/todos.json');
		if (response.ok) {
			const todos = await response.json();
			return {
				props: { todos }
			};
		}
		const { message } = await response.json();
		return {
			error: new Error(message)
		};
	};
</script>

<script lang="ts">
	import TodoItem from '$lib/todo-item.svelte';

	export let todos: Todo[];

	const title = 'Todo';

	const processNewTodoResult = async (result: Response, form: HTMLFormElement) => {
		const newTodo = await result.json();
		todos = [...todos, newTodo];
		form.reset();
	};

	const processUpdatedTodoResult = async (result: Response) => {
		const updatedTodo = await result.json();
		todos = todos.map((t) => {
			if (t.uid === updatedTodo.uid) return updatedTodo;
			return t;
		});
	};
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="container px-5 py-24 mx-auto">
	<div class="text-center mb-20">
		<h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-white mb-4">
			{title}
		</h1>
		<form
			class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-center"
			action="/todos.json"
			method="post"
			use:enhance={{ result: processNewTodoResult }}
		>
			<input
				type="text"
				name="text"
				placeholder="+ create a new todo"
				class="w-full bg-gray-800 rounded bg-opacity-40 border border-gray-700 focus:ring-2
                focus:ring-blue-900 focus:bg-transparent focus:border-blue-500 text-base outline-none
                text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out text-center text-xl"
			/>
		</form>
	</div>
	<div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
		{#each todos as todo}
			<TodoItem
				{todo}
				processDeletedTodoResult={() => {
					todos = todos.filter((t) => t.uid !== todo.uid);
				}}
				{processUpdatedTodoResult}
			/>
		{/each}
	</div>
</div>

<script context="module" lang="ts">
    import type { Load } from "@sveltejs/kit";
    import { enhance } from "$lib/actions/form";

    export const load: Load = async ({ fetch }) => {
        const response = await fetch("/todos.json");
        if (response.ok) {
            const todos = await response.json();
            return {
                props: { todos }
            }
        }
        const { message } = await response.json();
        return {
            error: new Error(message)
        }
    };
</script>

<script lang="ts">
    import TodoItem from "$lib/todo-item.svelte";

    export let todos: Todo[];

    const title = "Todo";

    const processNewTodoResult = async (result: Response, form: HTMLFormElement) => {
        const newTodo = await result.json();
        todos = [...todos, newTodo];
        form.reset();
    };

    const processUpdatedTodoResult = async (result: Response) => {
        const updatedTodo = await result.json();
        todos = todos.map(t => {
            if (t.uid === updatedTodo.uid) return updatedTodo;
            return t;
        });
    };

</script>

<style>
    .todos {
        width: 100%;
        max-width: 42rem;
        margin: 4rem auto 0 auto;
    }

    .new {
       margin: 0 0 .5rem 0; 
    }

    .new input {
        font-size: 1.5rem;
        width: 100%;
        padding: .5rem;
        border: 1px solid #ccc;
        border-radius: .25rem;
        text-align: center;
        background: rgba(54, 54, 54, 0.05);
    }

    .todos :global(input) {
        border: 1px solid transparent;
    }

    .todos :global(input:focus-visible) {
        box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.2);
        border: 1px solid transparent;
        outline: none;
    }
</style>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="todos">
    <h1>{title}</h1>

    <form class="new" action="/todos.json" method="post" use:enhance={{result: processNewTodoResult}}>
        <input type="text" name="text" placeholder="+ create a new todo">
    </form>

    {#each todos as todo}
        <TodoItem {todo}
        processDeletedTodoResult={() => {
            todos = todos.filter(t => t.uid !== todo.uid);
          }}
        {processUpdatedTodoResult}
          />
    {/each}
</div>

<script>
    import TodoItem from "$lib/todo-item.svelte";

    const title = "Todo";
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

    <form class="new">
        <input type="text" name="text" placeholder="+ create a new todo">
    </form>
    
    <TodoItem></TodoItem>
    <TodoItem></TodoItem>
    <TodoItem></TodoItem>
</div>

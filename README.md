# Introduction

This git repository contains the official `spin` base image that can be used to create `archetypes`. Spin stands for "Static Page INcubator" and is a tool that can be used to compile static web pages from markdown files and handlebar templates. The idea behind spin is that you define `Archetypes` that perform transformations on whatever code you have in your folder. These archetypes can be written in any language you want, and are executed through a OCI Container to ensure that they are runnable on any system that runs `Podman` or `Docker`.
